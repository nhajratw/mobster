const electron = require('electron')
const {ipcMain} = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function positionWindowLeft(window) {
  let bounds = electron.screen.getPrimaryDisplay().bounds
  let height = 100;
  let width = 200;
  window.setPosition(0, bounds.height - height);
}

function positionWindowRight(window) {
  let bounds = electron.screen.getPrimaryDisplay().bounds
  let height = 100;
  let width = 200;
  window.setPosition(bounds.width - width, bounds.height - height);
}

function createWindow () {
  let height = 100;
  let width = 200;
  mainWindow = new BrowserWindow({transparent: true, frame: false, alwaysOnTop: true,
    width: width, height: height})

  positionWindowLeft(mainWindow)

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  ipcMain.on('timer-mouse-hover', (event) => {
    [x, y] = mainWindow.getPosition()
    if (x === 0) {
      positionWindowRight(mainWindow)
    } else {
      positionWindowLeft(mainWindow)
    }
  })

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
