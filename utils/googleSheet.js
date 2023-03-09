import { google } from 'googleapis';

// Email: apoorva@alert-result-380113.iam.gserviceaccount.com
// Add this email as an editor in your Google Spreadsheet if you want to edit data using this app

import credentials from './credentials.json';
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

// Fetch DATA
export async function getData() {
  try {

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: process.env.SHEET_NAME, // sheet name
    });

    const rows = response.data.values;
    return rows;
  } catch (err) {
    console.log(err);
  }
  return [];
}

// Append DATA
export async function addRowToSheet(rowData) {
  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: process.env.SHEET_NAME,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [rowData],
      },
    });

    console.log(`${response.data.updates.updatedCells} cells updated.`);
  } catch (err) {
    console.error(err);
  }
}


// Fetch Row with given Email
export async function fetchRow(email) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: process.env.SHEET_NAME, // sheet name
    });

    const rows = response.data.values;
    // const rowWithEmail = rows.find((row) => row[3] === email);
    // console.log("rowWithEmail",rowWithEmail)
    const rowIndex = rows.findIndex(row => row[3] === email);

    if (rowIndex >= 0) {
      return rows[rowIndex];
    }
    else{
      return [];
    }
  }
  catch (err) {
    console.error(err);
  }

}

// Attendance DATA
export async function addAttendance(email) {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: process.env.SHEET_NAME, // sheet name
    });

    const rows = response.data.values;
    // const rowWithEmail = rows.find((row) => row[3] === email);
    // console.log("rowWithEmail",rowWithEmail)
    const rowIndex = rows.findIndex(row => row[3] === email);

    if (rowIndex >= 0) {
      // update the 7th column of the found row
      const rowToUpdate = rows[rowIndex];
      rowToUpdate[7] = 'present';

      // build the update request
      const updateRequest = {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: `${process.env.SHEET_NAME}!A${rowIndex + 1}:Z${rowIndex + 1}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [rowToUpdate],
        },
      };

      // send the update request
      const updateResponse = await sheets.spreadsheets.values.update(updateRequest);

      return "Success";
    }
  } catch (err) {
    console.error(err);
  }
}
