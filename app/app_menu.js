const electron = require('electron');
const { Menu } = electron;
const menuTemplate = require('./app_menu_template');

function createMenu(mainWindow) {
  return  Menu.buildFromTemplate(menuTemplate(mainWindow));
}

// set the application menu
const setAppMenu = function (mainWindow) {
  //const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(createMenu(mainWindow));
};

module.exports = setAppMenu;