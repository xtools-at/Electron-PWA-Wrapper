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
    ? 'app-mac.png'
    : 'app-win.ico';
  const trayIcon = process.platform === 'darwin'
    ? 'tray-mac.png'
    : 'tray-win.ico';
  const trayIconPath = path.join(__dirname, 'src', 'assets', trayIcon);
  appIconPath = path.join(__dirname, 'src', 'assets', appIcon);

  // get main page ready
  loadAppWindows(Helper.isFirstStart());
  // create menu
  setAppMenu(mainWindow);
  // create tray
  tray = new AppTray(trayIconPath, mainWindow);
  // create TouchBar on macOS
  if (c.settings.useTouchBar && process.platform === 'darwin') {
    const setTouchBar = require('./app/touch_bar');
    setTouchBar(mainWindow);
  }
});

// Handle BrowserWindow setup
function loadAppWindows(showLoader) {
  // setup/load main page
  var appPath = c.settings.usePhotonKitShell && process.platform === 'darwin'
    ? `file://${__dirname}/src/macOS.html`
    : c.settings.appUrl;
  //mainWindow = new MainWindow(, appIconPath, !showLoader);
  mainWindow = new MainWindow(appPath, appIconPath, !showLoader);

  // quit app when mainWindow is closed
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

  if (mainWindow) {
    // mainWindow is hidden, refresh and show it directly
    mainWindow.loadHome();
    mainWindow.show();
  } else {
    // instantiate mainWindow additionally
    loadAppWindows(false);
  }
  
});

if (c.settings.usePhotonKitShell && process.platform === 'darwin') {
  // macOS + PhotonKit listeners
  //const ipc = require('./app/ipc_mac');
  const { Notification } = electron;
  const resize = function(width, height) {
    let bounds = mainWindow.getBounds();
    const currSize = mainWindow.getSize();

    const diffWidth = (currSize[0] - width);
    let newX = bounds.x - (diffWidth / 2);
    if (newX < 0) {
      newX = 0;
    }
    bounds.x = newX;

    mainWindow.setSize(width, height, true);
    mainWindow.setBounds(bounds, true);
  };

  if (Notification.isSupported()) {
    ipcMain.on('webview:notification', (event) => {
      new Notification({
        title: 'Anfrage erfolgreich versandt',
        subtitle: 'Subtitle',
        body: 'Sie erhalten Ihr Angebot innerhalb von höchstens 2 Werktagen, aber wir setzen alles daran, schneller zu sein!',
      }).show();
    });
  }

  ipcMain.on('titlebar:small_view', (event) => {
    resize(c.settings.width, c.settings.height);
  });
  ipcMain.on('titlebar:large_view', (event) => {
    resize(c.settings.largeWidth, c.settings.largeHeight);
  });
}
