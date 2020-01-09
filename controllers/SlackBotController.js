// Import Botkit's core features
const { Botkit } = require('botkit')

// Import a platform-specific adapter for slack.
const {
  SlackAdapter,
  SlackMessageTypeMiddleware,
  SlackEventMiddleware,
} = require('botbuilder-adapter-slack')

const {
  SLACK_URI,
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_APP_SIGNIN_SECRET,
  SLACK_VERIFICATION_TOKEN,
  SLACK_BOT_USER_OAUTH,
} = require('../env')

const adapter = new SlackAdapter({
  // REMOVE THIS OPTION AFTER YOU HAVE CONFIGURED YOUR APP!
  enable_incomplete: true,

  // parameters used to secure webhook endpoint
  verificationToken: SLACK_VERIFICATION_TOKEN,
  clientSigningSecret: SLACK_APP_SIGNIN_SECRET,

  // auth token for a single-team app
  botToken: SLACK_BOT_USER_OAUTH,

  // credentials used to set up oauth for multi-team apps
  clientId: SLACK_CLIENT_ID,
  clientSecret: SLACK_CLIENT_SECRET,
  scopes: ['bot'],

  // functions required for retrieving team-specific info
  // for use in multi-team apps
  getTokenForTeam: getTokenForTeam,
  getBotUserByTeam: getBotUserByTeam,
})

// Use SlackEventMiddleware to emit events that match their original Slack event types.
adapter.use(new SlackEventMiddleware())

// Use SlackMessageType middleware to further classify messages as direct_message, direct_mention, or mention
adapter.use(new SlackMessageTypeMiddleware())

const controller = new Botkit({
  webhook_uri: SLACK_URI,

  adapter: adapter,
})

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(__dirname + '/../features')
})

controller.webserver.get('/', (req, res) => {
  res.send(
    `(Slack Controller) This app is running Botkit ${controller.version}.`
  )
})

controller.webserver.get('/install', (req, res) => {
  // getInstallLink points to slack's oauth endpoint and includes clientId and scopes
  res.redirect(controller.adapter.getInstallLink())
})

controller.webserver.get('/install/auth', async (req, res) => {
  try {
    const results = await controller.adapter.validateOauthCode(req.query.code)

    console.log('FULL OAUTH DETAILS', results)

    // Store token by team in bot state.
    tokenCache[results.team_id] = results.bot.bot_access_token

    // Capture team to bot id
    userCache[results.team_id] = results.bot.bot_user_id

    res.json('Success! Bot installed.')
  } catch (err) {
    console.error('OAUTH ERROR:', err)
    res.status(401)
    res.send(err.message)
  }
})

let tokenCache = {}
let userCache = {}

if (process.env.TOKENS) {
  tokenCache = JSON.parse(process.env.TOKENS)
}

if (process.env.USERS) {
  userCache = JSON.parse(process.env.USERS)
}

async function getTokenForTeam(teamId) {
  if (tokenCache[teamId]) {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(tokenCache[teamId])
      }, 150)
    })
  } else {
    console.error('Team not found in tokenCache: ', teamId)
  }
}

async function getBotUserByTeam(teamId) {
  if (userCache[teamId]) {
    return new Promise(resolve => {
      setTimeout(function() {
        resolve(userCache[teamId])
      }, 150)
    })
  } else {
    console.error('Team not found in userCache: ', teamId)
  }
}
