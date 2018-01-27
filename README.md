# Electron PWA Wrapper

A sample wrapper app to package your Progressive Web App into a Desktop Application using [Electron](https://github.com/electron/electron), [Electon-Builder](https://github.com/electron-userland/electron-builder) and [Photon](https://github.com/connors/photon).

Drafted for the Desktop-version of my [Leasing Calculator](https://www.leasingrechnen.at) Web App using [React](https://github.com/facebook/react), [Redux](https://github.com/reactjs/redux), [Materialize.css](https://github.com/Dogfalo/materialize) and a lot of Offline-First love over at [leasingrechnen.at](https://www.leasingrechnen.at).

## Features
- build with electron-builder for macOS, Windows and Linux
- custom shell for each OS
- macOS TouchBar support
- handle connectivity issues natively in the wrapper

## Wanna give it a try?
- clone repository, *cd* into the directory
- run `npm install` to get the dependencies
- run `npm run electron` to start the app
- check out */app/constants.js* for more options (e.g. setting your own URL)

## Basic Customizing
- Place your Tray- and App-Icons into `src/assets`.
- Change `app/app_menu_template.js` to use your own Menu Items.
- Check `app/constants.js` for localizing your Strings (this project is German by default).
	- if you know how to do multi-language in Electron, a Pull-Request would be much appreciated!!
- While in `app/constants.js`, check the `settings` and `mainWindow` sections too.
- The Offline- and Loading-Screens are located in `src/offline.html` and `src/loader.html`, their corresponding images and styles in `src/res`.

## Custom Shell
You can create a custom shell for your WebApp for each OS, to give it a more native look and feel or add functionality you can't supply from your WebApp, using [Photon](https://github.com/connors/photon).
- Go to `src` directory and find `shellMacOS.html`, `shellWindows.html` or `shellLinux.html` to see a sample implementation of the shell.
	- *You'll need to customize the whole template to your needs!* This is plain HTML, so your configured values in the _constants.js_ won't work.
	- There's an example of a multi-column macOS shell with built-in navigation in `src/shellMacOS-withMenu.html`.
	- If you create new events, sent by the shell to the Main process, you'll have to listen for and handle them in `/index.js`.
- In `constants.json -> settings`:
	- Locate `usePhotonKitShell` (macOS), `useWindowsShell` or `useLinuxShell` and enable accordingly.
	- Set `nodeIntegrationEnabled` to _true_.
	- Set `frame` to _false_ for macOS. For other OS', it depends on how you create your shell. I wouldn't recommend disabling the frame on Windows, as this hides your native Menu completely.

## Building with [electron-builder](https://github.com/electron-userland/electron-builder)
Electron-PWA-Wrapper comes with *electron-builder* preconfigured for macOS (dmg, mas), Linux ( (AppImage)[https://appimage.org] ) and Windows (Appx + Portable).

### Preperations
- You'll need to 
	- look up your `package.json` and put in your App's values in the *build* section
	- and put all the required graphics into the `build` directory.
	- See the below, and the [electron-builder Docs](https://www.electron.build) for further details!
- run `npm run build` or `./node_modules/.bin/electron-builder build` to start the build. Your app files will be located in the `dist` folder.

### Build for macOS App Store
- Have a machine running the latest macOS ready, and latest _XCode_ installed.
- Get a paid Apple Developer membership (~€99,- per year) and create Certificates, Identifiers and Provisioning Profiles for macOS:
	- Certificates: Production -> _Mac App Distribution_ and _Mac Installer Distribution_.
	- Identifiers: App IDs -> create one with your package/bundle name (e.g. 'com.example.myawesomeapp').
	- Provisioning Profiles: Distribution -> _Mac Distribution_ for the Identifier you just created.
- Download the certificates and double-click them to get them installed in your local Keychain.
- Download and copy your Provisioning Profile to the project root and rename it to `embedded.provisionprofile`.
- Make sure you've updated your `package.json`->`build`-> _appId_, _productName_, _copyright_ and _mac_->_category_
- Put the required icons in place:
	- in `build`->_icon.iconset_, replace all the icons in the folder. Sizes and namings are important!
	- open the terminal, navigate to `build` and run the following command to create your `icon.icns` from the iconset you've just populated.
		- `iconutil -c icns icon.iconset`
- Edit the `build/Info.plist` and `build/entitlements.mas.plist` and replace _YourTeamId_ and _YourPackageId_.
	- You can find your Team ID on the Apple Developer Account in _Membership_.
	- Your package ID is the bundle identifier you've created in step 1.
- Run `npm run build` from the terminal.
	- If it fails, you might have to give the process proper permission by running `sudo ./node_modules/.bin/electron-builder build` instead.

### Build for Windows Store
- Have a machine running Windows 10 Enterprise ready, with all latest updates and `windows-build-tools` installed.
- Get a paid [Windows Dev Center Publisher Account](https://developer.microsoft.com/en-us/store/register) (~€25,- once) and sign up for [DesktopBridge](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge) Support for your app.
- Create your App in the [Windows Dev Dasboard](https://developer.microsoft.com/en-us/dashboard/windows/overview) to get the values for the next step.
- Update your `package.json`->`build`->`win`-> _legalTrademarks_ and _publisherName_, and all the attributes in `build`->`appx`.
- Put the required icons in place:
	- in `build`: _icon.ico_
	- in `build/appx`: replace all the icons in the folder. Sizes and namings are important!
- Run `npm run build` from the command line (preferably from PowerShell).

### Build for Linux (any distro, using AppImage)
#### Icons still buggy - any help appreciated!
- Have a machine running an updated Ubuntu or Debian ready. Install Node.JS >= 6 like described [here](https://nodejs.org/en/download/package-manager).
- Install build dependencies: `sudo apt install -y icnsutils graphicsmagick`
- Create your `build/icon.icns` like described in _Build for macOS App Store_.
- Update your `package.json`->`build`->`linux` and ->`appImage`.
- Run `npm run build` and find your _.AppImage_ in the `dist` folder.
- Tell your users to run `chmod a+x *.AppImage` or change permissions to make the file executable.

## License
[GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html) - if you use it, we wanna see it!
