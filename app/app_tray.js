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
    if (this.mainWindow.isMinimized()) {
      this.mainWindow.restore();
    } else if (!this.mainWindow.isVisible()) {
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig =[
      {
        label: c.strings.quit,
        click: () => app.quit(),
      },
    ];

    if (this.mainWindow.isMinimized()) {
      menuConfig.unshift({
        label: c.strings.open,
        click: () => this.onClick(),
      });
    }

    this.popUpContextMenu(
      Menu.buildFromTemplate(menuConfig)
    );
  }
}

module.exports = AppTray;
