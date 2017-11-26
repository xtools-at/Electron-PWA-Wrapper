const electron = require('electron');
const { Tray, app, Menu } = electron;
const c = require('./constants');

class AppTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip(c.settings.appName);
    
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }

  
  onClick(event, bounds) {
    if (process.platform === 'darwin') {
      // behave like other tray icons on OSX and open menu on left click
      this.onRightClick();
    } else {
      // go default
      this.restoreWindow();
    }
  }

  onRightClick() {
    const menuConfig =[
      {
        label: c.menu.app.quit,
        click: () => app.quit(),
      },
    ];

    if (this.mainWindow.isMinimized() || !this.mainWindow.isFocused()) {
      menuConfig.unshift({
        label: c.strings.open,
        click: () => this.restoreWindow(),
      });
    }

    this.popUpContextMenu(
      Menu.buildFromTemplate(menuConfig)
    );
  }

  restoreWindow() {
    if (this.mainWindow.isMinimized()) {
      this.mainWindow.restore();
    } else if (!this.mainWindow.isVisible()) {
      this.mainWindow.show();
    }
    // bring it to the top
    this.mainWindow.focus();
  }
}

module.exports = AppTray;
