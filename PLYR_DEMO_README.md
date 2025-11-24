# 🎬 Plyr Media Player Demo

## Giới thiệu

Đây là một trang demo hoàn chỉnh để showcase các chức năng của [Plyr](https://plyr.io/) - một media player mạnh mẽ và dễ sử dụng cho HTML5 Video, HTML5 Audio, YouTube và Vimeo.

## 🚀 Tính năng chính

### 1. HTML5 Video Player

-   **Controls đầy đủ**: Play, pause, progress, volume, fullscreen
-   **Preview thumbnails**: Hiển thị thumbnail khi hover trên progress bar
-   **Điều chỉnh tốc độ**: Từ 0.5x đến 2x
-   **Chọn chất lượng**: Hỗ trợ nhiều độ phân giải
-   **Phụ đề đa ngôn ngữ**: Tiếng Anh và tiếng Tây Ban Nha
-   **Picture-in-Picture**: Hỗ trợ PiP mode
-   **AirPlay**: Tương thích với AirPlay

### 2. HTML5 Audio Player

-   **Controls tối ưu**: Được thiết kế riêng cho audio
-   **Điều chỉnh tốc độ**: Thay đổi tốc độ phát nhạc
-   **Progress bar**: Với khả năng seek chính xác
-   **Volume control**: Điều chỉnh âm lượng
-   **Fullscreen mode**: Giao diện fullscreen cho audio

### 3. YouTube Player

-   **Giao diện tùy chỉnh**: Sử dụng giao diện Plyr thay vì YouTube mặc định
-   **Controls tương tự**: Giống như HTML5 video player
-   **Privacy-friendly**: Không có quảng cáo, tracking tối thiểu
-   **Responsive design**: Tương thích với mọi kích thước màn hình

### 4. Vimeo Player

-   **Giao diện tùy chỉnh**: Sử dụng giao diện Plyr
-   **Privacy-focused**: Tôn trọng quyền riêng tư người dùng
-   **Không có branding**: Loại bỏ branding của Vimeo
-   **Controls đầy đủ**: Tương tự các player khác

## ⌨️ Phím tắt

| Phím    | Chức năng       |
| ------- | --------------- |
| `Space` | Play/Pause      |
| `←`     | Seek backward   |
| `→`     | Seek forward    |
| `↑`     | Tăng volume     |
| `↓`     | Giảm volume     |
| `M`     | Mute/Unmute     |
| `F`     | Fullscreen      |
| `C`     | Toggle captions |

## 🌐 Hỗ trợ trình duyệt

-   ✅ Chrome
-   ✅ Firefox
-   ✅ Safari
-   ✅ Edge
-   ✅ Opera

## 🛠️ Cách sử dụng

### 1. Truy cập trang demo

-   Chạy ứng dụng: `npm run dev`
-   Truy cập: `http://localhost:5173/plyr-demo`
-   Hoặc click vào menu "Plyr Media Player Demo" trong sidebar

### 2. Tương tác với players

-   **Video**: Sử dụng controls để điều khiển video, thay đổi tốc độ, chất lượng
-   **Audio**: Điều chỉnh âm lượng và tốc độ phát
-   **YouTube/Vimeo**: Xem video với giao diện tùy chỉnh

### 3. Khám phá tính năng

-   Hover trên progress bar để xem preview thumbnails
-   Click vào settings để thay đổi tốc độ, chất lượng
-   Sử dụng phím tắt để điều khiển nhanh

## 📁 Cấu trúc file

```
src/
├── pages/
│   ├── PlyrDemoPage.jsx    # Component chính của trang demo
│   └── PlyrDemoPage.css    # Styling cho trang demo
├── App.jsx                 # App chính với routing
└── ...
```

## 🔧 Cài đặt và dependencies

Trang demo sử dụng CDN của Plyr, không cần cài đặt thêm packages:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.plyr.io/3.7.8/plyr.css" />

<!-- JavaScript -->
<script src="https://cdn.plyr.io/3.7.8/plyr.js"></script>
```

## 🎨 Tùy chỉnh

### Thay đổi video/audio sources

```jsx
<video ref={videoRef} controls>
    <source src="your-video.mp4" type="video/mp4" />
    <source src="your-video.webm" type="video/webm" />
</video>
```

### Tùy chỉnh Plyr options

```jsx
new window.Plyr(videoRef.current, {
    controls: ["play", "progress", "volume", "fullscreen"],
    speed: { selected: 1, options: [0.5, 1, 1.5, 2] },
    quality: { default: 720, options: [480, 720, 1080] },
});
```

### Thay đổi YouTube/Vimeo videos

```jsx
// YouTube
data-plyr-embed-id="YOUR_YOUTUBE_VIDEO_ID"

// Vimeo
data-plyr-embed-id="YOUR_VIMEO_VIDEO_ID"
```

## 🌟 Tính năng nâng cao

### Preview Thumbnails

```jsx
previewThumbnails: {
  enabled: true,
  src: 'path/to/your/thumbnails.vtt'
}
```

### Custom Controls

```jsx
controls: [
    "play",
    "progress",
    "current-time",
    "duration",
    "mute",
    "volume",
    "captions",
    "settings",
    "pip",
    "airplay",
    "fullscreen",
];
```

### Keyboard Shortcuts

```jsx
// Tùy chỉnh phím tắt
keyboard: {
  focused: true,
  global: true
}
```

## 📱 Responsive Design

Trang demo được thiết kế responsive và hoạt động tốt trên:

-   Desktop (1200px+)
-   Tablet (768px - 1199px)
-   Mobile (480px - 767px)
-   Small mobile (< 480px)

## 🎭 Dark Mode

Trang demo tự động hỗ trợ dark mode dựa trên system preference của người dùng.

## 🔗 Liên kết hữu ích

-   [Trang chủ Plyr](https://plyr.io/)
-   [GitHub Repository](https://github.com/sampotts/plyr)
-   [Documentation](https://github.com/sampotts/plyr#documentation)
-   [Demo Examples](https://plyr.io/#html5)

## 🤝 Đóng góp

Nếu bạn muốn cải thiện trang demo này, hãy:

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

Trang demo này sử dụng MIT License, tương tự như Plyr.

---

**Lưu ý**: Đây là trang demo để showcase Plyr, không phải sản phẩm thương mại. Tất cả media content được sử dụng từ Plyr demo và chỉ dành cho mục đích demo.
