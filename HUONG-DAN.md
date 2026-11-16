# Hướng dẫn đưa thiệp lên GitHub Pages + nhận xác nhận tham dự

## Cấu trúc thư mục (phải giữ nguyên)
```
index.html
images/   (ảnh thiệp)
fonts/    (font chữ)
```

## A. Nối form với Google Sheet
1. Tạo Google Sheet, copy ID trong link (đoạn giữa `/d/` và `/edit`).
2. Mở Apps Script, dán toàn bộ `apps-script.gs`, thay `DÁN_ID_VÀO_ĐÂY` bằng ID, lưu.
3. Chạy hàm `testGhi` một lần để cấp quyền, kiểm tra tab **RSVP** trong Sheet rồi xoá dòng thử.
4. **Triển khai → Ứng dụng web** (Thực thi: Tôi, Truy cập: Bất kỳ ai), copy link `/exec`.
5. Dán link vào dòng `const SCRIPT_URL = "";` trong `index.html`.
Khi sửa code Apps Script: **Triển khai → Quản lý các bản triển khai → Chỉnh sửa → Phiên bản mới → Triển khai** (link giữ nguyên).

## B. GitHub Pages
Upload `index.html`, thư mục `images` và `fonts` lên repo → Settings → Pages → Deploy from a branch → `main` / `(root)`.

## C. Nhạc nền
Phát bằng video YouTube "Một ngày nào đó" (Hoàng Dũng). Muốn đổi bài, sửa `VIDEO_ID` trong `index.html`.
Trình duyệt chặn tự bật tiếng, nên có màn hình mở đầu: bấm "Mở thiệp" là nhạc bật; nút loa góc phải dưới để tắt/bật.

## D. Link riêng cho từng người (tuỳ chọn)
Thêm `?ten=Cô%20Lan` vào cuối link để ô tên điền sẵn.
