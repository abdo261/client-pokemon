import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';
import { spawn } from 'child_process'; // Import child_process to spawn the API server
let server;
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,title:"Poutchi",
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  ipcMain.handle('print-table', async (event, content) => {
    const printWindow = new BrowserWindow({
      width: 800,
      height: 600,
      show: false,
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        contextIsolation: true,
        nodeIntegration: false,
      }
    });
  
    printWindow.loadURL(`data:text/html;charset=utf-8,${encodeURIComponent(content)}`);
  
    await new Promise(resolve => printWindow.webContents.on('did-finish-load', resolve));
  
    printWindow.webContents.print({
      silent: true, // Suppress the print dialog
      printBackground: true
    }, (success, errorType) => {
      if (!success) {
        console.error('Print failed:', errorType);
      }
      printWindow.close();
    });
  });
  
  
}
// function startServer() {
//   const apiPath = join(__dirname, '../../../server'); // Adjust the path to your API directory
//   server = spawn('npm', ['run',"dev"], { cwd: apiPath, shell: true });

//   server.stdout.on('data', (data) => {
//     console.log(`API Server: ${data}`);
//   });

//   server.stderr.on('data', (data) => {
//     console.error(`API Server Error: ${data}`);
//   });

//   server.on('close', (code) => {
//     console.log(`API Server exited with code ${code}`);
//   });
// }
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  // startServer(); // Start the API server when the app is ready

  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // if (server) {
    //   server.kill(); // Kill the server process when the app quits
    // }
    app.quit();
  }
});
