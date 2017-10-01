const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    const options = {
      height: 360,
      width: 640,
      webPreferences: {nodeIntegration: false,},
    };

    super(options);

    this.loadURL(url);
    // this.on('blur', this.onBlur.bind(this));
  }

  /*
  onBlur() {
    this.hide();
  }
  */
}

module.exports = MainWindow;
