const electron = require('electron');
const { app, Menu } = electron;

// create menu template
const menuTemplate = [
  {
    label: 'File',
    submenu: [
      /*
      {
        label: 'New Todo',
        click() { createAddWindow(); }
      },
      {
        label: 'Clear Todos',
        click() {
          mainWindow.webContents.send('todo:clear');
        }
      },
      */
      {
        label: 'Quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

/*
// change menu according to platform
if (process.platform === 'darwin') {
  menuTemplate.unshift({});
}
*/

// additional menu items for development
if (process.env.NODE_ENV !== 'production') {
  menuTemplate.push({
    label: 'Developer',
    submenu: [
      { role: 'reload' },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}

// set the application menu
const setAppMenu = function () {
  //const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(null);
};

module.exports = setAppMenu;