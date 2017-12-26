const Constants = {
  settings: {
    appName: 'Leasing Rechner',
    appUrl: 'https://www.leasingrechnen.at', // without trailing slash!
    nodeIntegrationEnabled: false, // disable if you need jQuery,Angular,...
    userAgentPostfixDefault: 'DesktopApp',
    userAgentPostfixWindows: 'WindowsApp',
    userAgentPostfixOSX: 'MacOSXApp',
    themeColor: '#F44336',
  },
  mainWindow: {
    width: 460,
    height: 780,
  },
  strings: {
    open: 'Öffnen',
  },
  menu: {
    app: {
      about: 'Über',
      quit: 'Beenden',
      hide: 'verbergen',
      hideothers: 'Andere verbergen',
      unhide: 'Alle anzeigen',
    },
    file: {
      label: 'Datei',
    },
    edit: {
      label: 'Bearbeiten',
      undo: 'Rückgänging',
      redo: 'Wiederholen',
      cut: 'Ausschneiden',
      copy: 'Kopieren',
      paste: 'Einfügen',
      selectall: 'Alles auswählen'
    },
    window: {
      label: 'Fenster',
      minimize: 'Minimieren',
      close: 'Schließen',
      front: 'Alle in den Vordergrund',
    },
    calculate: {
      label: 'Berechnen',
      car: 'Kfz Leasing berechnen',
      movables: 'Mobilien Leasing berechnen',
    },
  },
};

module.exports = Constants;
