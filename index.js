const path = require('path');
const electron = require('electron');
const AppTray = require('./app/app_tray');
const setAppMenu = require('./app/app_menu');
const MainWindow = require('./app/main_window');
const c = require('./app/constants');

const { app, Menu, ipcMain } = electron;

let mainWindow;
let spinnerWindow;
let offineWindow;
let tray;

app.on('ready', () => {
  // set up icons
  const appIcon = process.platform === 'darwin' ? 'tray.png' : 'app.png';
  const trayIcon = 'tray.png';
  const appIconPath = path.join(__dirname, 'src', 'assets', appIcon);
  const trayIconPath = path.join(__dirname, 'src', 'assets', trayIcon);

  // get main page ready
  loadAppWindows(appIconPath);
  // create menu
  setAppMenu(mainWindow);
  // create tray
  tray = new AppTray(trayIconPath, mainWindow);
});

function loadAppWindows(appIconPath) {
  // hide offline page if applicable
  if (offineWindow && offineWindow.isVisible()) {
    offlineWindow.hide();
    offlineWindow = null;
  }
  // show loader-page
  spinnerWindow = new MainWindow(path.resolve(__dirname, 'src', 'index.html'), appIconPath);

  // load main page
  mainWindow = new MainWindow(c.settings.appUrl, appIconPath, false);
  // hide loader when app is ready
  mainWindow.once('ready-to-show', () => {
    spinnerWindow.hide();
    spinnerWindow = null;
    mainWindow.show();
    mainWindow.on('closed', () => app.quit());
  });

  // show offline-page if no connectivity
  mainWindow.webContents.on('did-fail-load', function(ev, errorCode, errorDesc, url) {
    // @TODO: show refresh site/widget when errorCode < 200
    offlineWindow = new MainWindow(path.resolve(__dirname, 'src', 'offline.html'), appIconPath);
    mainWindow.hide();
  });
}

ipcMain.on('app:refresh', (event) => {
  loadAppWindows();
});