const { app, BrowserWindow, ipcMain } = require('electron')
const open = require('open');
const Store = require('electron-store');
const store = new Store();
const ProtocolRegistry = require("protocol-registry");
require('update-electron-app')({
    repo: 'TokyoTF/AnimeGenzai-Desktop',
    updateInterval: '5 minute'
  })

const gotTheLock = app.requestSingleInstanceLock()

if(!gotTheLock){
    app.quit();
}else {
    require('./index');
    app.whenReady().then((main))
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

    win.webContents.openDevTools()

    ProtocolRegistry
        .register({
            protocol: "AnimeGenzai",
            command: `"${process.execPath}" ${win.loadURL("http://localhost:25125/")}$_URL_`,
            override: true,
            script: false,
            terminal: true,
        })
        .then((r) => {
            console.log("Protocol registered");
        })
        .catch(console.error);

    if (!app.isDefaultProtocolClient('AnimeGenzai')) {
        app.setAsDefaultProtocolClient('AnimeGenzai');
    }



    // Open link in browser
    win.webContents.on('new-window', async function (e, url) {
        if (url == "https://discord.gg/F59KYXtjMv" || url == "https://github.com/TokyoTF/AnimeGenzai-Desktop" || url == "https://github.com/TokyoTF/AnimeGenzai-Desktop/discussions") {
            e.preventDefault();
            await open(url)
        } else {
            e.preventDefault();
        }

    });

    // ready Render
    win.on('ready-to-show', () => {
        win.webContents.setZoomFactor(1);
        win.show()
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
    ipcMain.on('window_maximize', (r) => {
        win.isMaximized() ? win.unmaximize() : win.maximize()
    })

    // MacOS Close
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
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
app.commandLine.appendSwitch('enable-gpu-rasterization', true);
app.commandLine.appendSwitch('high-dpi-support', true);
app.commandLine.appendSwitch('device-scale-factor', true);
app.commandLine.appendSwitch('disable-touch-adjustment', true);
app.commandLine.appendSwitch('force_low_power_gpu', true);

module.exports = app