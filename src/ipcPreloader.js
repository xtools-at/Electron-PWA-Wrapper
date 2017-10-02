const electron = require('electron');
const {ipcRenderer} = electron;

window.ipcRenderer = ipcRenderer;
