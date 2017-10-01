const electron = require('electron');
const { BrowserWindow, session, shell } = electron;
const c = require('./constants');

class MainWindow extends BrowserWindow {
  constructor(iconPath) {
    // create options object
    const options = {
      width: c.mainWindow.width,
      height: c.mainWindow.height,
      title: c.settings.appName,
      icon: iconPath,
      backgroundColor: c.settings.themeColor,
      webPreferences: {
        nodeIntegration: c.settings.nodeIntegrationEnabled,
      }, 
    };

    // initalize BrowserWindow
    super(options);

    //  -- Event listeners: --
    // Open new windows in default Browser
    this.webContents.on('new-window', function(e, url) {
      e.preventDefault();
      shell.openExternal(url);
    });
    // show fallback when no connection available
    this.webContents.on('did-fail-load', function(ev, errorCode, errorDesc, url) {
      // @TODO: show refresh site/widget when errorCode < 200
    });

    // Load url
    this.loadRelativeUrl('/');
  }

  // add custom user agent postifx (e.g. for google analytics)
  loadCustomUrl(url) {
    this.loadURL(url, {
      userAgent: (session.defaultSession.getUserAgent()
        + ' ' + c.settings.userAgentPostfix),
    });
  }

  loadRelativeUrl(url) {
    this.loadCustomUrl(c.settings.appUrl + url);
  }
}

module.exports = MainWindow;
