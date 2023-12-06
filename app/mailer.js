const fs=require('fs');
const readline= require('readline');
const { google } = require('googleapis');

const SCOPES = [
  'https://mail.google.com/',
  'https://www.googleapis.com/auth/gmail.send',
];
const TOKEN_PATH = '../app/config/mail_token.json';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function base64Encode(message) {
  return Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function sendMail(auth, emailAddress) {
  return new Promise((resolve, reject) => {
    const gmail = google.gmail({ version: 'v1', auth });
    const authentication_code = getRandomInt(100000, 999999).toString();
    gmail.users.messages.send(
      {
        userId: 'me',
        requestBody: {
          raw: base64Encode(
            'From: oldedusolution@gmail.com\n' +
              `To: ${emailAddress}\n` +
              'Subject: "UniUnity Authentication Code"\n' +
              'MIME-Version: 1.0\n' +
              'Content-Type: text/plain; charset="UTF-8"\n' +
              'Content-Transfer-Encoding: message/rfc2822\n' +
              '\n' +
              `Authentication Code: ${authentication_code} \n`
          ),
        },
      },
      (err, res) => {
        if (err) {
          console.log('The API returned an error:', err);
          reject(err);
        } else {
          const messageId = res.data.id;
          console.log(`Message sent with ID: ${messageId}`);
          resolve(authentication_code);
        }
      }
    );
  });
}

async function authorize(credentials, callback, emailAddress) {
  return new Promise((resolve, reject) => {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getNewToken(oAuth2Client, callback, emailAddress);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, emailAddress)
        .then((authentication_code) => resolve(authentication_code))
        .catch((err) => reject(err));
    });
  });
}
function getNewToken(oAuth2Client, callback, emailAddress) {
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
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client, emailAddress);
    });
  });
}

async function sendEmailWithAuthorization(emailAddress) {
  return new Promise((resolve, reject) => {
    fs.readFile('../app/config/mail_credentials.json', (err, content) => {
      if (err) {
        console.log('Error loading client secret file:', err);
        reject(err);
      }
      authorize(JSON.parse(content), sendMail, emailAddress)
        .then((authentication_code) => resolve(authentication_code))
        .catch((err) => reject(err));
    });
  });
}

module.exports=sendEmailWithAuthorization;
