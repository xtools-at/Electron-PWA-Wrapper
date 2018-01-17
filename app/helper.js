const c = require('./constants');
// Helper functions
const Helper = {
  // detects first-start if built with electron-builder
  // see also: https://github.com/electron/windows-installer
  isFirstStart: function () {
    var cmd = process.argv[1];
    return (cmd == '--squirrel-firstrun');
  },
  useTouchBar: function() {
    return c.settings.useTouchBar && process.platform === 'darwin';
  },
  useWindowsShell: function() {
    return  c.settings.useWindowsShell && process.platform !== 'darwin';
  },
  usePhotonKitShell: function() {
    return c.settings.usePhotonKitShell && process.platform === 'darwin';
  },
};

module.exports = Helper;
