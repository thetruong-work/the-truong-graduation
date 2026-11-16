// Google Apps Script – nhận câu trả lời từ thiệp mời và ghi vào Google Sheet.
// Dán vào Apps Script, thay DÁN_ID_VÀO_ĐÂY bằng ID của Google Sheet (xem HUONG-DAN.md).

const SHEET_ID = 'DÁN_ID_VÀO_ĐÂY';
const SHEET_NAME = 'RSVP';
const HEADERS = ['Thời gian', 'Tên', 'Trạng thái', 'Lời chúc', 'Link riêng (ten=)'];
const TRANG_THAI = { 'co': 'Sẽ đến', 'chua-chac': 'Chưa chắc', 'khong': 'Không đến được' };

function safe(v, max) {
  let s = String(v == null ? '' : v).slice(0, max);
  // chặn công thức độc hại khi mở trong Sheets/Excel
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function ghi(d) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  sh.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sh.setFrozenRows(1);
  sh.appendRow([
    new Date(),
    safe(d.ten, 60),
    TRANG_THAI[d.trangthai] || 'Chưa rõ',
    safe(d.loichuc, 400),
    safe(d.ref, 60)
  ]);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    ghi(JSON.parse(e.postData.contents));
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Chạy thử 1 lần trong editor để kiểm tra (xoá dòng thử sau khi xem)
function testGhi() {
  ghi({ ten: 'Thử nghiệm', trangthai: 'co', loichuc: 'Dòng thử, xoá đi nha', ref: '' });
}
