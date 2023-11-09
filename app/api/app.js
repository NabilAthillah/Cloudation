const { google } = require('googleapis');
const fs = require('fs');
const apikeys = require('./credentials.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

export async function authorize() {
  const jwtClient = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPE
  );

  await jwtClient.authorize();

  return jwtClient;
}

export async function uploadFile(authClient, buktiPembayaran) {
  return new Promise((resolve, reject) => {
    const drive = google.drive({ version: 'v3', auth: authClient });

    const fileMetadata = {
      name: buktiPembayaran,
      parents: ['14ndLJFL-ElZycPbndT9cxOVv3WecJP7i'],
    };

    const media = {
      mimeType: 'image/*',
      body: fs.createReadStream(`public/Uploads/${buktiPembayaran}`),
    };

    drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink',
      },
      function (error, file) {
        if (error) {
          console.log(error);
          return reject(error);
        }
        fs.unlink(`public/Uploads/${buktiPembayaran}`, (unlinkError) => {
          if (unlinkError) {
            console.error('Error deleting local file:', unlinkError);
          } else {
            console.log('Local file deleted.');
          }

          // Set file permission to allow viewing and downloading but not editing
          drive.permissions.create(
            {
              fileId: file.data.id,
              requestBody: {
                role: 'reader', // Viewer
                type: 'anyone', // Anyone with the link
              },
            },
            (permissionError) => {
              if (permissionError) {
                console.error('Error setting file permissions:', permissionError);
                reject(permissionError);
              } else {
                // Resolve with webViewLink
                resolve(file.data.webViewLink);
              }
            }
          );
        });
      }
    );
  });
}


// You can call the functions like this, but make sure you handle any errors appropriately in your code.
authorize()
  .then((authClient) => uploadFile(authClient, buktiPembayaran))
  .then((uploadedFile) => console.log('Response from Google Drive:', uploadedFile))
  .catch((error) => console.error('Error connecting to Google Drive:', error));

  