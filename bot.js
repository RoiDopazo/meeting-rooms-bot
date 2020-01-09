//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the meeting rooms bot bot.

// Import Botkit's core features
const { Botkit } = require('botkit')

// Load process.env values from .env file
require('dotenv').config()

const controller = new Botkit({
  webhook_uri: '/api/messages',

  adapterConfig: {
    appId: process.env.APP_ID,
    appPassword: process.env.APP_PASSWORD,
  },
})

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + '/features')

  /* catch-all that uses the CMS to trigger dialogs */
  if (controller.plugins.cms) {
    controller.on('message,direct_message', async (bot, message) => {
      let results = false
      results = await controller.plugins.cms.testTrigger(bot, message)

      if (results !== false) {
        // do not continue middleware!
        return false
      }
    })
  }
})

controller.webserver.get('/', (req, res) => {
  res.send(`This app is running Botkit ${controller.version}.`)
})
