# VidFeed — Vertical Video Feed 

Mô phỏng UX xem video cuộn dọc (TikTok / Reels) bằng **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **lucide-react**.

## Demo
- **Live:** https://test-nguyenvana-123.vercel.app
- **Video demo:** https://drive.google.com/...
- **Source:** https://github.com/.../test-nguyenvana-123

## Stack & Lý do chọn
| Công nghệ | Lý do |
|---|---|
| Next.js App Router | Routing & layout chuẩn 2024+, RSC giúp shell render nhanh |
| TypeScript | An toàn kiểu, IntelliSense tốt cho refactor |
| Tailwind CSS | Style nhanh, dễ responsive (sidebar/bottom-nav switch theo breakpoint) |
| lucide-react | Bộ icon nhẹ, tree-shake tốt |

## Tính năng đã hoàn thành
-  Vertical scroll feed với **CSS Scroll Snap**
- Click video → Play/Pause
- **Auto-play khi vào viewport, Auto-pause khi rời viewport** (Intersection Observer)
-  Nút Like có state: đổi màu đỏ, tăng/giảm count
-  Responsive Navigation: Bottom Nav (mobile) / Sidebar (desktop)
- **Fallback UI khi video URL lỗi** — bắt qua `onError` event

## Logic Play/Pause khi cuộn (Intersection Observer)

Mỗi `<VideoCard>` đăng ký một `IntersectionObserver` riêng (đóng gói trong custom hook `useVideoAutoplay`) theo dõi chính phần tử `<video>` của nó:

1. Khi video chiếm **≥ 70% viewport** (`intersectionRatio >= 0.7`) → gọi `videoEl.play()`.
2. Khi rơi xuống dưới ngưỡng đó → gọi `videoEl.pause()`.
3. Observer được `disconnect()` trong cleanup của `useEffect` để tránh memory leak khi component unmount.

**Xử lý bẫy DOMException:** `HTMLMediaElement.play()` là **Promise async**. Khi user cuộn rất nhanh, hàm `pause()` có thể được gọi trong lúc `play()` chưa resolve, browser sẽ throw `AbortError: The play() request was interrupted by a call to pause()`. Mình giải quyết bằng cách **luôn `.catch()`** trên promise của `play()` để nuốt lỗi này — đồng thời cũng bao luôn `NotAllowedError` xảy ra khi autoplay policy chặn. Để đảm bảo policy autoplay không chặn, video được set `muted` mặc định (yêu cầu bắt buộc của Chrome/Safari để phép autoplay không cần user gesture).

UI state (icon Play overlay) được sync qua sự kiện `onPlay`/`onPause` của `<video>` thay vì set thủ công, nên dù trigger play/pause đến từ **click chuột** hay **Intersection Observer** thì UI luôn nhất quán.

## Vì sao có Error Fallback UI?

Khi test thực tế, một số link mp4 mẫu của đề có thể bị die (404, CORS, hoặc host xoá file) — nếu để vậy, trình duyệt sẽ render một player vỡ với icon "broken video" mặc định, UX rất tệ và làm hỏng layout của feed.

Mình xử lý bằng cách lắng nghe **`onError` event** của `<video>`. Khi event bắn ra, set `hasError = true`, component sẽ render `<ErrorFallback />` — một block nền gradient tối, có icon `AlertTriangle` từ `lucide-react` và thông báo *"Video không khả dụng"*. Đồng thời `useVideoAutoplay` cũng nhận `disabled: hasError` để **không cố gọi `play()`** trên video đã lỗi (tránh log lỗi liên tục trong console).

## Run local
```bash
npm install
npm run dev
```

## Cấu trúc thư mục
```
app/         # App Router (layout, page, globals)
components/  # Navigation, VideoFeed, VideoCard
hooks/       # useVideoAutoplay (IntersectionObserver)
data/        # mockVideos
types/       # Video interface
```