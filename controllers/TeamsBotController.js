// Import Botkit's core features
const { Botkit } = require('botkit')
const {
  MICROSOFT_TEAMS_URI,
  MICROSOFT_TEAMS_APP_ID,
  MICROSOFT_TEAMS_APP_PASSWORD,
} = require('../env')

const controller = new Botkit({
  webhook_uri: MICROSOFT_TEAMS_URI,

  adapterConfig: {
    appId: MICROSOFT_TEAMS_APP_ID,
    appPassword: MICROSOFT_TEAMS_APP_PASSWORD,
  },
})

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + '/../features')
})

controller.webserver.get('/', (req, res) => {
  res.send(
    `(Teams Controller) This app is running Botkit ${controller.version}.`
  )
})
