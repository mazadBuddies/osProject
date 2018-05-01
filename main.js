const electron = require('electron');
const url = require('url');
const path = require('path');
const SJF = require('./SJF.js');

const {app, BrowserWindow, ipcMain} = electron;

var mainWindow;

process.env.NODE_ENV = 'production';

//listen to ready
app.on('ready', function(){
    //create window
    mainWindow = new BrowserWindow({
        height: 400,
        width: 400,
        resizable: true
    });
    mainWindow.setMenu(null);
    //load html
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main.html'),
        protocol: 'file:',
        slashes: true
    }));
});

//catch processes
ipcMain.on('processes', function(e, item){
    SJF.startProcessing(item, function(processes, chart){
        mainWindow.webContents.send('info', {processes, chart}); //send processes and chart
    })
});

//catch checkSymbol
ipcMain.on('checkSymbol', function(e, item){
    binanceAPI.getPrice(item, function(price, rate){
        coinPrice = price;
        mainWindow.webContents.send('price', {price, rate});
    });
});