// Helper functions
const Helper = {
  // detects first-start if built with electron-builder
  // see also: https://github.com/electron/windows-installer
  isFirstStart: function () {
    var cmd = process.argv[1];
    return (cmd == '--squirrel-firstrun');
  },
};

module.exports = Helper;
