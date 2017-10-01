const electron = require('electron');
const { Tray, app, Menu } = electron;
const c = require('./constants');

class AppTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip('Leasing Rechner');
    
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
    const menuConfig = Menu.buildFromTemplate([
      {
        label: c.strings.quit,
        click: () => app.quit()
      }
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = AppTray;
