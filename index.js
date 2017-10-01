const path = require('path');
const electron = require('electron');
const AppTray = require('./app/app_tray');
const setAppMenu = require('./app/app_menu');
const MainWindow = require('./app/main_window');

const { app, Menu } = electron;

let mainWindow;
let tray;

app.on('ready', () => {
  // app.dock.hide();
  // mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  // load main page
  mainWindow = new MainWindow('https://www.leasingrechnen.at');

  // set up icons
  const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  // create menu
  setAppMenu();

  // create tray
  tray = new AppTray(iconPath, mainWindow);
});
