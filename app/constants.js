const Constants = {
  settings: {
    appName: 'Leasingrechner',
    appUrl: 'https://www.leasingrechnen.at', // without trailing slash!
    nodeIntegrationEnabled: true, // keep disabled unless you run into ipcRenderer-specific troubles
    enableDevMenu: false, // enable for dev-builds only!
    userAgentPostfixWindows: 'WindowsApp', // custom user agent postfixes to distinguish traffic in Analytics
    userAgentPostfixOSX: 'MacOSXApp',
    themeColor: '#F44336',
    windowBackgroundColor: '#FFFFFF', // set to false to disable
    titleBarStyle: 'hidden', // use 'hidden' or 'hiddenInset' for Frameless windows
    frame: process.platform === 'darwin'
      ? false
      : true, // set to false for Frameless windows
    useTouchBar: true, // edit in app/touch_bar.js
    usePhotonKitShell: true, // macOS: loads src/shellMacOS.html with PhotonKit instead of the appUrl.
    useWindowsShell: true,   // Win: use custom shell from src/shellWIndows.html
                             // both require 'nodeIntegrationEnabled: true'.
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
