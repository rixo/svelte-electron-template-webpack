const electron = require('electron')
const fetch = require('node-fetch')

const { app, BrowserWindow } = require('electron')

const dev = process.env.NODE_ENV !== 'production'

const port = 8080

const devUrl = `http://localhost:${port}/index.html`

const indexFile = '../public/index.html'

function createWindow() {
  // Cree la fenetre du navigateur.
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  })

  if (dev) {
    win.loadURL(devUrl)
  } else {
    win.loadFile(indexFile)
  }

  win.webContents.openDevTools()
}

const onAppReady = () => new Promise(resolve => app.on('ready', resolve))

const noop = () => {}

const onServerReady = ({ interval = 100 } = {}) =>
  new Promise(resolve => {
    const ping = () => {
      fetch(devUrl)
        .then(res => {
          if (res.ok) {
            resolve()
          } else {
            retry()
          }
        })
        .catch(retry)
    }
    const retry = () => {
      setTimeout(ping, interval)
    }
    const start = ping
    start()
  })

const onReady = dev
  ? () => Promise.all([onAppReady(), onServerReady()])
  : onAppReady

const onError = err => {
  console.error((err && err.stack) || err)
  process.exit(1)
}

onReady()
  .then(createWindow)
  .catch(onError)
