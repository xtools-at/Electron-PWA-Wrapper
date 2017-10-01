const electron = require('electron');
const { app, Menu } = electron;
const c = require('./constants');

function createMenu(mainWindow) {
  // create menu template
  const menuTemplate = [
    {
      label: c.menu.file,
      submenu: [
        {
          label: c.strings.quit,
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click() {
            app.quit();
          }
        },
      ],
    },
    {
      label: c.menu.calculate,
      submenu: [
        {
          label: c.menu.sub.calc_car,
          accelerator: process.platform === 'darwin' ? 'Command+A' : 'Ctrl+A',
          click() {
            mainWindow.loadRelativeUrl('/');
          }
        },
        {
          label: c.menu.sub.calc_movables,
          accelerator: process.platform === 'darwin' ? 'Command+M' : 'Ctrl+M',
          click() {
            mainWindow.loadRelativeUrl('/mobilien-rechner');
          }
        },
      ],
    },
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
      label: 'Development',
      submenu: [
      /*
        { role: 'reload' },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
          click(item, focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        }
        */
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'},
        {type: 'separator'},
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'},
      ]
    });
  }

  return  Menu.buildFromTemplate(menuTemplate);
}

// set the application menu
const setAppMenu = function (mainWindow) {
  //const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(createMenu(mainWindow));
};

module.exports = setAppMenu;