const Constants = {
  settings: {
    appName: 'Leasingrechner',
    appUrl: 'https://www.leasingrechnen.at', // without trailing slash!
    nodeIntegrationEnabled: true, // keep disabled unless you run into ipcRenderer-specific troubles
    userAgentPostfixWindows: 'WindowsApp', // custom user agent postfixes to distinguish traffic in Analytics
    userAgentPostfixOSX: 'MacOSXApp',
    themeColor: '#F44336',
    titleBarStyle: 'hidden', // use 'default' to reset
    windowBackgroundColor: '#FFFFFF', // set to false to disable
    frame: false, // set to false for Frameless Windows
    useTouchBar: true,
    usePhotonKitShell: true, // macOS: loads src/macOS.html with PhotonKit instead of the appUrl.
                             //requires 'nodeIntegrationEnabled: true'.
  },
  mainWindow: {
    width: 830,
    height: 860,
    largeWidth: 1220,
    largeHeight: 860,
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
    view: {
      label: 'Ansicht',
      fullscreen: 'Vollbild de-/aktivieren'
    },
    window: {
      label: 'Fenster',
      minimize: 'Minimieren',
      close: 'Schließen',
      front: 'Alle in den Vordergrund',
    },
    help: {
      label: 'Hilfe',
      contact: 'Kontakt'
    },
    leasing: {
      label: 'Berechnen',
      car: 'Kfz Leasing berechnen',
      movables: 'Mobilien Leasing berechnen',
      inquiry: 'Leasing Angebot anfordern',
    },
  },
  touchBar: {
    label: 'Leasing',
    car: 'Kfz Rechner',
    movables: 'Mobilien Rechner',
    inquiry: 'Angebot anfordern',
  }
};

module.exports = Constants;
