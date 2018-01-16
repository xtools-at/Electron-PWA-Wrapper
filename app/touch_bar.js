const electron = require('electron');
const { TouchBar } = electron;
const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar;
const c = require('./constants');

// create TouchBar
const setTouchBar = function(mainWindow) {
    // create template
    const touchBarTemplate = [
        new TouchBarLabel({
            label: c.menu.leasing.label,
        }),
        new TouchBarButton({
            label: c.menu.leasing.car,
            backgroundColor: '#7851A9',
            click: () => {
                mainWindow.loadRelativeUrl('/');
            },
        }),
        new TouchBarSpacer({size: 'small'}),
        new TouchBarButton({
            label: c.menu.leasing.movables,
            backgroundColor: '#7851A9',
            click: () => {
                mainWindow.loadRelativeUrl('/mobilien-rechner');
            },
        }),
        new TouchBarButton({
            label: c.menu.leasing.inquiry,
            backgroundColor: '#7851A9',
            click: () => {
                mainWindow.loadRelativeUrl('/angebot');
            },
        }),
    ];
    // build touchbar from template
    const touchBar = new TouchBar(touchBarTemplate);
    // set touchbar on window
    mainWindow.setTouchBar(touchBar);
}

module.exports = setTouchBar;
