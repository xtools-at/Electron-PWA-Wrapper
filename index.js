const path = require('path');
const electron = require('electron');
const AppTray = require('./app/app_tray');
const setAppMenu = require('./app/app_menu');
const MainWindow = require('./app/main_window');
const c = require('./app/constants');

const { app, Menu } = electron;

let mainWindow;
//let spinnerWindow;
let tray;

app.on('ready', () => {
  // set up icons
  const appIcon = process.platform === 'darwin' ? 'tray.png' : 'app.png';
  const trayIcon = 'tray.png';
  const appIconPath = path.join(__dirname, `./src/assets/${appIcon}`);
  const trayIconPath = path.join(__dirname, `./src/assets/${trayIcon}`);

  // load loader-page
  //spinnerWindow = new MainWindow(path.join(__dirname, `./src/index.html`), appIconPath);

  // load main page
  mainWindow = new MainWindow(c.settings.appUrl, appIconPath, false);
  mainWindow.once('ready-to-show', () => {
      // spinnerWindow.hide();
      // spinnerWindow = null;
      mainWindow.show();
    });

  // create menu
  setAppMenu(mainWindow);
  // create tray
  tray = new AppTray(trayIconPath, mainWindow);
});
