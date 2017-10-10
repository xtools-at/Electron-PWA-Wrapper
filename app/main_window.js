const path = require('path');
const electron = require('electron');
const { BrowserWindow, session, shell } = electron;
const c = require('./constants');

class MainWindow extends BrowserWindow {
  constructor(mainUrl, iconPath, show) {
    // create options object
    const options = {
      width: c.mainWindow.width,
      height: c.mainWindow.height,
      title: c.settings.appName,
      icon: iconPath,
      // backgroundColor: c.settings.themeColor,
      show: (show === false ? false : true),
      webPreferences: {
        nodeIntegration: c.settings.nodeIntegrationEnabled,
        preload: path.resolve(__dirname, '../src', 'ipcPreloader.js'),
      }, 
    };

    // initalize BrowserWindow
    super(options);
    this.mainUrl = mainUrl;

    //  -- Event listeners: --
    // Open new windows in default Browser
    this.webContents.on('new-window', function(e, url) {
      e.preventDefault();
      shell.openExternal(url);
    });

    // Load provided url
    this.loadHome();
  }

  // add custom user agent postifx (e.g. for google analytics)
  loadCustomUrl(url) {
    this.loadURL(url, {
      userAgent: (session.defaultSession.getUserAgent()
        + ' ' + c.settings.userAgentPostfix),
    });
  }

  loadRelativeUrl(url) {
    this.loadCustomUrl(this.mainUrl + url);
  }

  loadHome() {
    this.loadRelativeUrl('');
  }
}

module.exports = MainWindow;
