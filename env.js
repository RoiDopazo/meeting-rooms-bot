require('dotenv').config()

const MICROSOFT_TEAMS_APP_ID = process.env.MICROSOFT_TEAMS_APP_ID
const MICROSOFT_TEAMS_APP_PASSWORD = process.env.MICROSOFT_TEAMS_APP_PASSWORD
const MICROSOFT_TEAMS_URI = process.env.MICROSOFT_TEAMS_URI
const SLACK_CLIENT_ID = process.env.SLACK_CLIENT_ID
const SLACK_CLIENT_SECRET = process.env.SLACK_CLIENT_SECRET
const SLACK_APP_SIGNIN_SECRET = process.env.SLACK_APP_SIGNIN_SECRET
const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN
const SLACK_BOT_USER_OAUTH = process.env.SLACK_BOT_USER_OAUTH
const SLACK_URI = process.env.SLACK_URI

module.exports = {
  MICROSOFT_TEAMS_APP_ID,
  MICROSOFT_TEAMS_APP_PASSWORD,
  MICROSOFT_TEAMS_URI,
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_APP_SIGNIN_SECRET,
  SLACK_VERIFICATION_TOKEN,
  SLACK_BOT_USER_OAUTH,
  SLACK_URI,
}
