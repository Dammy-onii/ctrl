/**
 * CTRL waitlist backend — Google Apps Script.
 *
 * Appends every early-access signup to a Google Sheet. Free, no submission cap.
 *
 * SETUP
 * 1. Create a Google Sheet. In the first row add headers:
 *      timestamp | email | company | role | source
 * 2. Extensions → Apps Script. Delete the sample code, paste this file.
 * 3. Set SHEET_ID below to the id in your sheet's URL
 *    (docs.google.com/spreadsheets/d/THIS_PART/edit).
 * 4. Deploy → New deployment → type "Web app".
 *      - Execute as:  Me
 *      - Who has access:  Anyone
 *    Copy the "/exec" Web app URL it gives you.
 * 5. Put that URL in the site's .env.local as VITE_WAITLIST_ENDPOINT, then rebuild.
 *
 * To re-deploy after editing: Deploy → Manage deployments → edit → Version: New.
 */

const SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Sheet1"; // the tab name

function doGet() {
  // Visiting the /exec URL in a browser hits this — a quick "is it deployed?" check.
  return json({ success: true, status: "CTRL waitlist endpoint is live" });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = String(data.email || "").trim().toLowerCase();
    if (!email) return json({ success: false, error: "no email" });

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return json({ success: false, error: "sheet tab not found: " + SHEET_NAME });

    // Duplicates are allowed on purpose: every submission is logged as its own
    // timestamped row, so repeat sign-ups and return interest are captured. Dedupe
    // later in the sheet (e.g. a pivot on the email column) if you need a unique list.
    sheet.appendRow([
      new Date(),
      email,
      String(data.company || ""),
      String(data.role || ""),
      data.source || "landing",
    ]);

    return json({ success: true });
  } catch (err) {
    return json({ success: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
