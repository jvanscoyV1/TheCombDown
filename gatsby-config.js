// /**
//  * Implement Gatsby's Node APIs in this file.
//  *
//  * See: https://www.gatsbyjs.org/docs/node-apis/
//  */
// const fs = require('fs');
// const readline = require('readline');
// const {google} = require('googleapis');
// const os = require('os');
// const uuid = require('uuid');
// const path = require('path');



// async function downloadFile(drive, fileId) {
//   return new Promise(async (resolve, reject) => {
//     const filePath = path.join(os.tmpdir(), uuid.v4());
//     console.log(`writing file to: ${filePath}`);
//     const dest = fs.createWriteStream(filePath);
//     let progress = 0;
//     const res = await drive.files.get(
//       {fileId, alt: 'media'},
//       {responseType: 'stream'}
//     );
//     res.data
//       .on('end', () => {
//         console.log('Done downloading file!');
//         resolve(filePath);
//       })
//       .on('error', err => {
//         console.error('Error downloading file!');
//         reject(err);
//       })
//       .on('data', d => {
//         progress += d.length;
//         if(process.stdout.isTTY) {
//           process.stdout.clearLine();
//           process.stdout.cursorTo(0);
//           process.stdout.write(`Downloaded ${profress} bytes`);
//         }
//       })
//       .pipe(dest);
//   });
// }

// Copyright 2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const {google} = require('googleapis');
const fs = require('fs');
const os = require('os');
const uuid = require('uuid');
const path = require('path');




// If modifying these scopes, delete token.json.
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
  'https://www.googleapis.com/auth/drive.photos.readonly',
  'https://www.googleapis.com/auth/drive.readonly',
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
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
function getAccessToken(oAuth2Client, callback) {
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

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 3,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        downloadFile(drive, file.id);
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}

async function downloadFile(drive, fileId) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.join(os.tmpdir(), uuid.v4());
    console.log(`writing to ${filePath}`);
    const dest = fs.createWriteStream(filePath);
    let progress = 0;
    const res = await drive.files.get(
      {fileId, alt: 'media'},
      {responseType: 'stream'}
    );
    if(res)
      res.data
        .on('end', () => {
          console.log('Done downloading file.');
          resolve(filePath);
        })
        .on('error', err => {
          console.error('Error downloading file.');
          reject(err);
        })
        .on('data', d => {
          progress += d.length;
          if (process.stdout.isTTY) {
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write(`Downloaded ${progress} bytes`);
          }
        })
        .pipe(dest);
  });
}

// if invoked directly (not tests), authenticate and run the samples
if (module === require.main) {
  if (process.argv.length !== 3) {
    throw new Error('Usage: node samples/drive/download.js $FILE_ID');
  }
  const fileId = process.argv[2];
  const scopes = [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/drive.appdata',
    'https://www.googleapis.com/auth/drive.file',
    'https://www.googleapis.com/auth/drive.metadata',
    'https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/drive.readonly',
  ];
  sampleClient
    .authenticate(scopes)
    .then(() => runSample(fileId))
    .catch(console.error);
}

// export functions
module.exports = {
  siteMetadata: {
    title: `The Comb Down`,
    description: ``,
    author: `@jakevanscoy`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}