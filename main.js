const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

function createWindow() {
const win = new BrowserWindow({
    width: 1200,
    height: 800,
    // --- 여기서부터 중요 ---
    frame: false,             // 상단 메뉴바와 테두리를 제거합니다.
    transparent: true,        // 배경을 투명하게 만듭니다.
    hasShadow: true,          // 그림자 효과 (윈도우 전용)
    backgroundColor: '#00000000', // 배경색을 완전 투명(Alpha 0)으로 설정
    // -----------------------
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // 중요: 배포된 Vercel 주소를 여기에 넣으세요! 
  // 로컬에서 테스트할 때는 http://localhost:3000 을 넣어도 됩니다.
  const startUrl = isDev 
  ? 'http://localhost:3000' // 개발 모드일 때 로컬 호스트 접속
    : 'http://localhost:3000' ;

  win.loadURL(startUrl);

  win.setMenu(null);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});