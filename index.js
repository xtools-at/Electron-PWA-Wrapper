const path = require('path');
const electron = require('electron');
const AppTray = require('./app/app_tray');
const setAppMenu = require('./app/app_menu');
const Helper = require('./app/helper');
const MainWindow = require('./app/main_window');
const c = require('./app/constants');

const { app, Menu, ipcMain } = electron;

let mainWindow;
let spinnerWindow;
let offlineWindow;
let tray;
let appIconPath;

app.on('ready', () => {
  // set up icons
  const appIcon = process.platform === 'darwin'
    ? 'tray.png'
    : 'app.png';
  const trayIcon = 'tray.png';
  const trayIconPath = path.join(__dirname, 'src', 'assets', trayIcon);
  appIconPath = path.join(__dirname, 'src', 'assets', appIcon);

  // get main page ready
  loadAppWindows(Helper.isFirstStart());
  // create menu
  setAppMenu(mainWindow);
  // create tray
  tray = new AppTray(trayIconPath, mainWindow);
});

// Handle BrowserWindow setup
function loadAppWindows(showLoader) {
  // setup/load main page
  mainWindow = new MainWindow(c.settings.appUrl, appIconPath, !showLoader);
  mainWindow.on('closed', () => app.quit());

  if (showLoader) {
    // show loader window only on first start,
    // the PWA should be cached afterwards.
    spinnerWindow = new MainWindow(`file://${__dirname}/src/loader.html`, appIconPath);
    // hide loader when app is ready
    mainWindow.once('ready-to-show', () => {
      spinnerWindow.hide();
      spinnerWindow = null;
      mainWindow.show();
    });
  }
  /* DEBUG: force show offline window */
  // offlineWindow = new MainWindow(`file://${__dirname}/src/offline.html`, appIconPath);

  // show offline-page if no connectivity
  mainWindow.webContents.on('did-fail-load', function(ev, errorCode, errorDesc, url) {
    // @TODO: errorCode < 200 only ?
    offlineWindow = new MainWindow(`file://${__dirname}/src/offline.html`, appIconPath);
    mainWindow.hide();
  });
}

// Listen for events fired in the UI
ipcMain.on('app:refresh', (event) => {
  // hide offline window if applicable
  if (offlineWindow && offlineWindow.isVisible()) {
    offlineWindow.hide();
  }
  offlineWindow = null;
  // mainWindow is hidden, refresh and show it directly
  if (mainWindow) {
    mainWindow.loadHome();
    mainWindow.show();
  } else {
    loadAppWindows(false);
  }
  
});
