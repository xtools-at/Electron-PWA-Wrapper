const Constants = {
  settings: {
    appName: 'Leasing Rechner',
    appUrl: 'https://www.leasingrechnen.at', // without trailing slash!
    nodeIntegrationEnabled: false, // disable if you need jQuery,Angular,...
    userAgentPostfix: 'DesktopApp',
    themeColor: '#F44336',
  },
  mainWindow: {
    width:500,
    height: 780,
  },
  strings: {
    quit: 'Beenden',
    open: 'Öffnen',
  },
  menu: {
    file: 'Datei',
    calculate: 'Berechnen',
    sub: {
      calc_car: 'Kfz Leasing berechnen',
      calc_movables: 'Mobilien Leasing berechnen',
    },
  },
};

module.exports = Constants;
