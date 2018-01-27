const c = require('./constants');
// Helper functions
const Helper = {
  useTouchBar: function() {
    return c.settings.useTouchBar && this.isMacOS();
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
