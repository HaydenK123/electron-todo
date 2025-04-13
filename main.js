const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.handle('load-tasks', async () => {
  try {
    const data = fs.readFileSync('tasks.json');
    return JSON.parse(data);
  } catch {
    return [];
  }
});

ipcMain.handle('save-tasks', async (event, tasks) => {
  fs.writeFileSync('tasks.json', JSON.stringify(tasks));
});
