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
    return c.settings.useTouchBar && && this.isMacOS();
  },
  useWindowsShell: function() {
    return  c.settings.useWindowsShell && this.isWindows();
  },
  usePhotonKitShell: function() {
    return c.settings.usePhotonKitShell && this.isMacOS();
  },
  useLinuxShell: function() {
    return c.settings.useLinuxShell && this.isLinux();
  },
  isMacOS: function() {
    return process.platform === 'darwin';
  },
  isWindows: function() {
    return process.platform === 'win32';
  },
  isLinux: function() {
    return process.platform !== 'win32' && process.platform !== 'darwin';
  },
};

module.exports = Helper;
