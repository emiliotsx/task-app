const fs = require('node:fs/promises');
const path = require('node:path');
const process = require('node:process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    console.log('TOKEN_PATH', TOKEN_PATH)
    const content = await fs.readFile(TOKEN_PATH);
    console.log('content', content)
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    console.log('ERROR: loadSavedCredentialsIfExist', err)
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

async function create(auth, eventData) {
  const calendar = google.calendar({ version: 'v3', auth });

  const event = {
    summary: eventData.summary,
    description: eventData.description,
    start: eventData.start,
    end: eventData.end,
    attendees: [
      { email: 'kgarciac6@miumg.edu.gt' },
      { email: 'emiliofgonzalez7@gmail.com' },
    ],
  };

  const response = calendar.events.insert({
    auth: auth,
    calendarId: 'primary',
    resource: event,
  });

  return response;
}

const init = async (req, res) => {
  res.json({ data: "event controller" })
}

const createEvent = async (req, res) => {
  const eventData = req.body;
  try {
    const auth = await authorize();
    const response = await create(auth, eventData);
    res.json({ data: response })
  } catch (error) {
    res.status(400).send({ error })
  }
}

module.exports = {
  createEvent,
  init
}