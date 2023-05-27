/* eslint-disable no-undef */
import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';

// To check all scopes: https://developers.google.com/identity/protocols/oauth2/scopes?hl=en
// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), sendMail);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
function sendMail(auth) {
  const gmail = google.gmail({version: 'v1', auth});
  gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: base64Encode(
        'From: oldedusolution@gmail.com\n' +
        'To: 20211151@sungshin.ac.kr\n' +
        'Subject: "UniUnity Sign Up Authentication Code"\n' +
        'MIME-Version: 1.0\n' +
        'Content-Type: text/plain; charset="UTF-8"\n' +
        'Content-Transfer-Encoding: message/rfc2822\n' + // 7bit, quoted-printable
        '\n' +
        `Authentication Code: ${getRandomInt(100000,999999)} \n`
      ),
    },
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const messageId = res.data.id;
    console.log(`Message sent with ID: ${messageId}`);
  });
}

const base64Encode = (message) => {
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};