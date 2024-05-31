const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Cria uma janela de navegação.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,  // Importante para Electron 12+
      enableRemoteModule: true  // Se necessário
    }
  });

  // Carrega o backend do Laravel
  win.loadURL('http://localhost:8080');

  // Abre as Ferramentas de Desenvolvimento (DevTools).
  win.webContents.openDevTools();

  win.once('ready-to-show',()=>{
    win.show();
  });


  win.on('ready',createWindow);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});