const electron = require('electron');
const { TouchBar } = electron;
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;
const c = require('./constants');

// create TouchBar
const setTouchBar = function(mainWindow) {
    // create template
    const touchBarTemplate = [
        new TouchBarLabel({
            label: c.touchBar.label,
        }),
        new TouchBarButton({
            label: c.touchBar.car,
            backgroundColor: c.settings.themeColor,
            click: () => {
                mainWindow.webContents.send(
                    'touchBar:loadUrl',
                    '/'
                );
            },
        }),
        //new TouchBarSpacer({size: 'small'}),
        new TouchBarButton({
            label: c.touchBar.movables,
            backgroundColor: c.settings.themeColor,
            click: () => {
                mainWindow.webContents.send(
                    'touchBar:loadUrl',
                    '/mobilien-rechner'
                );
            },
        }),
        new TouchBarButton({
            label: c.touchBar.inquiry,
            backgroundColor: c.settings.themeColor,
            click: () => {
                mainWindow.webContents.send(
                    'touchBar:loadUrl',
                    '/angebot'
                );
            },
        }),
    ];
    // build touchbar from template
    const touchBar = new TouchBar(touchBarTemplate);
    // set touchbar on window
    mainWindow.setTouchBar(touchBar);
}

module.exports = setTouchBar;
