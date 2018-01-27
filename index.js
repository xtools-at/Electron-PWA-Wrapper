const path = require('path');
const electron = require('electron');
const AppTray = require('./app/app_tray');
const setAppMenu = require('./app/app_menu');
const Helper = require('./app/helper');
const MainWindow = require('./app/main_window');
const c = require('./app/constants');

const { app, Menu, ipcMain, Notification } = electron;

let mainWindow;
let spinnerWindow;
let offlineWindow;
let tray;
let appIconPath;

app.on('ready', () => {
  // set up icons
  let appIcon = 'app-mac.png';
  if (Helper.isLinux()) {
    appIcon = 'app-linux512x512.png';
  } else if (Helper.isWindows()) {
    appIcon = 'app-win.ico';
  }
  let trayIcon = 'tray-mac.png';
  if (Helper.isLinux()) {
    appIcon = 'tray-linux32x32.png';
  } else if (Helper.isWindows()) {
    appIcon = 'tray-win.ico';
  }
  const trayIconPath = path.join(__dirname, 'src', 'assets', trayIcon);
  appIconPath = path.join(__dirname, 'src', 'assets', appIcon);

  // get main page ready
  loadAppWindows(c.settings.showLoader);
  // create menu
  setAppMenu(mainWindow);
  // create tray
  tray = new AppTray(trayIconPath, mainWindow);
  // create TouchBar on macOS
  if (Helper.useTouchBar()) {
    const setTouchBar = require('./app/touch_bar');
    setTouchBar(mainWindow);
  }
});

// Handle BrowserWindow setup
function loadAppWindows(showLoader) {
  // setup/load main page
  let appPath = c.settings.appUrl;
  if (Helper.usePhotonKitShell()) {
    appPath = `file://${__dirname}/src/shellMacOS.html`;
  } else if (Helper.useWindowsShell()) {
    appPath = `file://${__dirname}/src/shellWindows.html`;
  } else if (Helper.useLinuxShell()) {
    appPath = `file://${__dirname}/src/shellLinux.html`;
  }
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
/// Sample Notification
if (Notification.isSupported()) {
  ipcMain.on('webview:notification', (event) => {
    const notification = new Notification({
      title: 'Anfrage erfolgreich versandt',
      // subtitle: 'Subtitle', // macOS only
      body: 'Sie erhalten Ihr Angebot innerhalb von höchstens 2 Werktagen, aber wir setzen alles daran, schneller zu sein!',
    });
    notification.show();
  });
}

// macOS- or Windows Shell listeners
if (Helper.usePhotonKitShell() || Helper.useWindowsShell() || Helper.useLinuxShell()) {
  const resize = function(width, height) {
    let bounds = mainWindow.getBounds();

    const diffWidth = (width - bounds.width);
    let newX = bounds.x - (diffWidth / 2);
    if (newX < 0) {
      newX = 0;
    }
    bounds.x = newX;
    bounds.height = height;
    bounds.width = width;

    mainWindow.setBounds(bounds, true);
  };

  ipcMain.on('titlebar:small_view', (event) => {
    resize(c.mainWindow.width, c.mainWindow.height);
  });
  ipcMain.on('titlebar:large_view', (event) => {
    resize(c.mainWindow.largeWidth, c.mainWindow.largeHeight);
  });
}
