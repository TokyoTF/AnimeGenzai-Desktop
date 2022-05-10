const { app, BrowserWindow, ipcMain, session, globalShortcut } = require('electron');
const open = require('open');
const Store = require('electron-store');
const store = new Store();
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch');
const ProtocolRegistry = require("protocol-registry");
require('update-electron-app')({
    repo: 'TokyoTF/AnimeGenzai-Desktop',
    updateInterval: '5 minutes'
})

const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
    app.quit();
} else {
    require('./index');
    app.whenReady().then((preloads));

}

//app.disableHardwareAcceleration();
async function main() {

    // Create window
    const win = new BrowserWindow({
        width: 1250,
        height: 650,
        frame: false,
        transparent: false,
        minWidth: 1250,
        minHeight: 650,
        center: true,
        show: false,
        fullscreenable: true,
        roundedCorners: true,
        title: "AnimeGenzai | アニメ現在",
        autoHideMenuBar: true,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })


    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(session.defaultSession);
      });
    //win.webContents.openDevTools()

    ProtocolRegistry
        .register({
            protocol: "AnimeGenzai",
            command: `"${process.execPath}" ${win.loadURL("http://localhost:25125/")}$_URL_`,
            override: true,
            script: false,
            terminal: true,
        })
        .catch(console.error);

    if (!app.isDefaultProtocolClient('AnimeGenzai')) {
        app.setAsDefaultProtocolClient('AnimeGenzai');
    }
    let wc = win.webContents;

    wc.on('before-input-event', (e, i) => {

        if(i.key === 'CapsLock') {
           if(i.type === 'keyUp') {
             e.preventDefault()
           } else {
              e.preventDefault()
           }
        } 
        if(i.key === 'TAB') {
           if(i.type === 'keyDown') {
             e.preventDefault()
           } else {
              e.preventDefault()
           }
           if(i.type === 'keyUp') {
            e.preventDefault()
          } else {
             e.preventDefault()
          }
        }
      });
    app.on('browser-window-focus', function () {
        globalShortcut.register("CommandOrControl+R", () => {
            
        });
        globalShortcut.register("F5", () => {
           
        });
    });
    
    app.on('browser-window-blur', function () {
        globalShortcut.unregister('CommandOrControl+R');
        globalShortcut.unregisterAll()
        globalShortcut.unregister('F5');
    });

    // Open link in browser
    win.webContents.on('new-window', async function (e, url) {
        if (url == "https://discord.gg/F59KYXtjMv" || url == "https://www.paypal.com/paypalme/V3CT0RBUG" || url == "https://github.com/TokyoTF/AnimeGenzai-Desktop" || url == "https://github.com/TokyoTF/AnimeGenzai-Desktop/discussions" || url == "https://animegenzai.xyz/" || url == "https://www.facebook.com/AnimeGenzai/" || url.includes("https://www.facebook.com/sharer/sharer.php?u=https://animegenzai.xyz/") || url.includes("https://twitter.com/intent/tweet?text=https://animegenzai.xyz/") || url.includes("https://animegenzai.xyz/") || url.includes("gencookie")) {
            e.preventDefault();
            await open(url)
        } else {
            e.preventDefault();
        }

    });

    session.defaultSession.on('will-download', (event) => {
        event.preventDefault()
    })
    // ready Render
    win.on('ready-to-show', () => {
        win.webContents.setZoomFactor(1);
        setTimeout(() => {
            win.show()
        }, 2400);

    });

    if (!store.get('tab-menu')) {
        store.set('tab-menu', 'true')
    }

    ipcMain.handle('setStoreValue', (event, channel, key) => {
        store.set(channel, key);
    });

    // Create window
    win.setTitle("AnimeGenzai | アニメ現在")
    ipcMain.on('window_minimize', () => {
        win.isMinimized() ? win.restore() : win.minimize()
    });
    ipcMain.handle('getStoreValue', (event, key) => {
        return store.get(key);
    });
    ipcMain.on('resize', (event, width, height) => {
        win.setSize(width, height, true);
    });



    // Menu Handler
    ipcMain.on('window_close', () => {
        app.quit();
    });
    ipcMain.on('window_maximize', () => {
        win.isMaximized() ? win.unmaximize() : win.maximize()
    })

    // MacOS Close
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) win()
    });



}

/* Preload */
async function preloads() {
    const preload = new BrowserWindow({
        width: 420,
        height: 210,
        frame: false,
        transparent: true,
        minWidth: 420,
        focus: true,
        minimizable:false,
        resizable: false,
        minHeight: 210,
        center: true,
        show: false,
        roundedCorners: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }

    });

    app.on('browser-window-focus', function () {
        globalShortcut.register("CommandOrControl+R", () => {
            
        });
        globalShortcut.register("F5", () => {
           
        });
    });
    let wc = preload.webContents;

    wc.on('before-input-event', (e, i) => {

        if(i.key === 'CapsLock') {
           if(i.type === 'keyUp') {
             e.preventDefault()
           } else {
              e.preventDefault()
           }
        }
      });
    app.on('browser-window-blur', function () {
        globalShortcut.unregister('CommandOrControl+R');
        globalShortcut.unregisterAll()
        globalShortcut.unregister('CapsLock');
        globalShortcut.unregister('F5');
    });
    

    preload.loadURL(`file://${__dirname}/preload.html`);
    //preload.webContents.openDevTools()
    preload.on('ready-to-show', () => {
        preload.webContents.setZoomFactor(1);
        preload.show()
        app.whenReady().then((main));

    });
    ipcMain.on('window_load_finish', () => {
        preload.close()
    });

}

//Config Dpi
app.commandLine.appendSwitch('auto-detect', true);
app.commandLine.appendSwitch('no-proxy-server');
app.commandLine.appendSwitch('enable-native-gpu-memory-buffers', true);
app.commandLine.appendSwitch('device-scale-factor', 1);
app.commandLine.appendSwitch('main-frame-resizes-are-orientation-changes', true);
app.commandLine.appendSwitch('disable-pinch', true);
app.commandLine.appendSwitch('enable-smooth-scrolling', '1'),
app.commandLine.appendSwitch('enable-overlay-scrollbar', '1');
app.commandLine.appendSwitch('enable-use-zoom-for-dsf', true);
app.commandLine.appendSwitch('use-vulkan');
app.commandLine.appendSwitch('enable-webgl2');
app.commandLine.appendSwitch('enable-webgl2-compute');
app.commandLine.appendSwitch('disable-gpu-compositing');
app.commandLine.appendSwitch('disable-gpu-shader-disk-cache');
app.commandLine.appendSwitch('enable-gpu-rasterization', true);
app.commandLine.appendSwitch('high-dpi-support', true);
app.commandLine.appendSwitch('device-scale-factor', true);

module.exports = app