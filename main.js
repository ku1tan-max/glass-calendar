// main.js
const { app, BrowserWindow, ipcMain } = require('electron'); // [수정] ipcMain 추가
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    transparent: true,
    hasShadow: true,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: true,    // [기존 유지]
      contextIsolation: false, // [기존 유지]
    },
  });

  const startUrl = isDev ? 'http://localhost:3000' : 'http://localhost:3000';
  win.loadURL(startUrl);
  win.setMenu(null);

  // --- [9. 주석] 창 제어 IPC 핸들러 등록 ---
  ipcMain.on('window-close', () => {
    app.quit(); // 앱 종료
  });

  ipcMain.on('window-minimize', () => {
    win.minimize(); // 창 최소화
  });
  
  // 설정창 등 향후 확장을 위한 핸들러 (현재는 콘솔 로그)
  ipcMain.on('window-settings', () => {
    console.log("Settings window requested");
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});