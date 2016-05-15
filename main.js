const path = require('path')
const glob = require('glob')
const electron = require('electron')

// var app = require('app');
const BrowserWindow = require('browser-window');
const app = electron.app

require('crash-reporter').start();

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  // local main process files
  var files = glob.sync(path.join(__dirname, 'mainProcess/*.js'))
  files.forEach(function (file) {
    require(file)
  })

  mainWindow = new BrowserWindow({width: 1360, height: 800});

  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  mainWindow.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
