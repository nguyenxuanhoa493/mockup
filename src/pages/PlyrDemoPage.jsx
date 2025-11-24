import React, { useEffect, useRef } from "react";
import "./PlyrDemoPage.css";

const PlyrDemoPage = () => {
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const youtubeRef = useRef(null);
    const vimeoRef = useRef(null);

    useEffect(() => {
        // Load Plyr CSS và JS từ CDN
        const loadPlyr = async () => {
            // Load CSS
            if (!document.querySelector('link[href*="plyr.css"]')) {
                const link = document.createElement("link");
                link.rel = "stylesheet";
                link.href = "https://cdn.plyr.io/3.7.8/plyr.css";
                document.head.appendChild(link);
            }

            // Load JS
            if (!window.Plyr) {
                const script = document.createElement("script");
                script.src = "https://cdn.plyr.io/3.7.8/plyr.js";
                script.onload = () => {
                    initializePlayers();
                };
                document.head.appendChild(script);
            } else {
                initializePlayers();
            }
        };

        const initializePlayers = () => {
            if (window.Plyr) {
                // HTML5 Video Player
                if (videoRef.current) {
                    new window.Plyr(videoRef.current, {
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
                        ],
                        settings: ["captions", "quality", "speed"],
                        speed: {
                            selected: 1,
                            options: [0.5, 0.75, 1, 1.25, 1.5, 2],
                        },
                        quality: {
                            default: 720,
                            options: [
                                4320, 2880, 2160, 1440, 1080, 720, 576, 480,
                                360, 240,
                            ],
                        },
                        captions: {
                            active: true,
                            language: "auto",
                            update: true,
                        },
                        previewThumbnails: {
                            enabled: true,
                            src: "https://cdn.plyr.io/static/demo/thumbs/100p.vtt",
                        },
                    });
                }

                // HTML5 Audio Player
                if (audioRef.current) {
                    new window.Plyr(audioRef.current, {
                        controls: [
                            "play",
                            "progress",
                            "current-time",
                            "duration",
                            "mute",
                            "volume",
                            "settings",
                            "fullscreen",
                        ],
                        settings: ["speed"],
                        speed: {
                            selected: 1,
                            options: [0.5, 0.75, 1, 1.25, 1.5, 2],
                        },
                    });
                }

                // YouTube Player
                if (youtubeRef.current) {
                    new window.Plyr(youtubeRef.current, {
                        youtube: {
                            noCookie: true,
                            rel: 0,
                            showinfo: 0,
                            iv_load_policy: 3,
                            modestbranding: 1,
                        },
                    });
                }

                // Vimeo Player
                if (vimeoRef.current) {
                    new window.Plyr(vimeoRef.current, {
                        vimeo: {
                            dnt: true,
                            byline: false,
                            portrait: false,
                            title: false,
                        },
                    });
                }
            }
        };

        loadPlyr();

        return () => {
            // Cleanup nếu cần
        };
    }, []);

    return (
        <div className="plyr-demo-page">
            <div className="demo-header">
                <h1>🎬 Plyr Media Player Demo</h1>
                <p>
                    Một media player đơn giản, dễ tiếp cận và có thể tùy chỉnh
                    cho HTML5 Video, HTML5 Audio, YouTube và Vimeo
                </p>
                <div className="demo-links">
                    <a
                        href="https://plyr.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        🌐 Trang chủ Plyr
                    </a>
                    <a
                        href="https://github.com/sampotts/plyr"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        📚 GitHub Repository
                    </a>
                </div>
            </div>

            <div className="demo-sections">
                {/* HTML5 Video Section */}
                <section className="demo-section">
                    <h2>🎥 HTML5 Video Player</h2>
                    <p>
                        Player với đầy đủ controls, preview thumbnails, và nhiều
                        tùy chọn
                    </p>
                    <div className="player-container">
                        <video
                            ref={videoRef}
                            crossOrigin="anonymous"
                            playsInline
                            controls
                        >
                            <source
                                src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
                                type="video/mp4"
                                size="576"
                            />
                            <source
                                src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
                                type="video/mp4"
                                size="720"
                            />
                            <source
                                src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-1080p.mp4"
                                type="video/mp4"
                                size="1080"
                            />
                            <track
                                kind="captions"
                                label="English"
                                srcLang="en"
                                src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.en.vtt"
                                default
                            />
                            <track
                                kind="captions"
                                label="Español"
                                srcLang="es"
                                src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.es.vtt"
                            />
                        </video>
                    </div>
                    <div className="features-list">
                        <h4>✨ Tính năng:</h4>
                        <ul>
                            <li>
                                Controls đầy đủ (play, pause, progress, volume,
                                fullscreen)
                            </li>
                            <li>Preview thumbnails khi hover</li>
                            <li>Điều chỉnh tốc độ phát (0.5x - 2x)</li>
                            <li>Chọn chất lượng video</li>
                            <li>Phụ đề đa ngôn ngữ</li>
                            <li>Picture-in-Picture</li>
                            <li>AirPlay</li>
                        </ul>
                    </div>
                </section>

                {/* HTML5 Audio Section */}
                <section className="demo-section">
                    <h2>🎵 HTML5 Audio Player</h2>
                    <p>Player audio với controls tối ưu cho âm nhạc</p>
                    <div className="player-container">
                        <audio ref={audioRef} controls>
                            <source
                                src="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_A_Burst.mp3"
                                type="audio/mp3"
                            />
                            <source
                                src="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_A_Burst.ogg"
                                type="audio/ogg"
                            />
                        </audio>
                    </div>
                    <div className="features-list">
                        <h4>✨ Tính năng:</h4>
                        <ul>
                            <li>Controls audio tối ưu</li>
                            <li>Điều chỉnh tốc độ phát</li>
                            <li>Progress bar với seek</li>
                            <li>Volume control</li>
                            <li>Fullscreen mode</li>
                        </ul>
                    </div>
                </section>

                {/* YouTube Section */}
                <section className="demo-section">
                    <h2>📺 YouTube Player</h2>
                    <p>Player YouTube với giao diện tùy chỉnh và controls</p>
                    <div className="player-container">
                        <div
                            ref={youtubeRef}
                            className="plyr__video-embed"
                            data-plyr-provider="youtube"
                            data-plyr-embed-id="bTqVqk7FSmY"
                        >
                            <iframe
                                src="https://www.youtube.com/embed/bTqVqk7FSmY?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
                                allowfullscreen
                                allowtransparency
                                allow="autoplay"
                            ></iframe>
                        </div>
                    </div>
                    <div className="features-list">
                        <h4>✨ Tính năng:</h4>
                        <ul>
                            <li>Giao diện tùy chỉnh</li>
                            <li>Controls tương tự HTML5 video</li>
                            <li>Không có quảng cáo</li>
                            <li>Privacy-friendly</li>
                            <li>Responsive design</li>
                        </ul>
                    </div>
                </section>

                {/* Vimeo Section */}
                <section className="demo-section">
                    <h2>🎬 Vimeo Player</h2>
                    <p>Player Vimeo với giao diện tùy chỉnh</p>
                    <div className="player-container">
                        <div
                            ref={vimeoRef}
                            className="plyr__video-embed"
                            data-plyr-provider="vimeo"
                            data-plyr-embed-id="76979871"
                        >
                            <iframe
                                src="https://player.vimeo.com/video/76979871?dnt=1"
                                allowfullscreen
                                allowtransparency
                                allow="autoplay; fullscreen"
                            ></iframe>
                        </div>
                    </div>
                    <div className="features-list">
                        <h4>✨ Tính năng:</h4>
                        <ul>
                            <li>Giao diện tùy chỉnh</li>
                            <li>Controls tương tự HTML5 video</li>
                            <li>Privacy-focused</li>
                            <li>Responsive design</li>
                            <li>Không có branding</li>
                        </ul>
                    </div>
                </section>

                {/* Keyboard Shortcuts */}
                <section className="demo-section">
                    <h2>⌨️ Phím tắt</h2>
                    <div className="shortcuts-grid">
                        <div className="shortcut-item">
                            <kbd>Space</kbd>
                            <span>Play/Pause</span>
                        </div>
                        <div className="shortcut-item">
                            <kbd>←</kbd>
                            <span>Seek backward</span>
                        </div>
                        <div className="shortcut-item">
                            <kbd>→</kbd>
                            <span>Seek forward</span>
                        </div>
                        <div className="shortcut-item">
                            <kbd>↑</kbd>
                            <span>Tăng volume</span>
                        </div>
                        <div className="shortcut-item">
                            <kbd>↓</kbd>
                            <span>Giảm volume</span>
                        </div>
                        <div className="shortcut-item">
                            <kbd>M</kbd>
                            <span>Mute/Unmute</span>
                        </div>
                        <div className="shortcut-item">
                            <kbd>F</kbd>
                            <span>Fullscreen</span>
                        </div>
                        <div className="shortcut-item">
                            <kbd>C</kbd>
                            <span>Toggle captions</span>
                        </div>
                    </div>
                </section>

                {/* Browser Support */}
                <section className="demo-section">
                    <h2>🌐 Hỗ trợ trình duyệt</h2>
                    <div className="browser-support">
                        <div className="browser-item">
                            <span className="browser-name">Chrome</span>
                            <span className="support-status supported">
                                ✓ Hỗ trợ
                            </span>
                        </div>
                        <div className="browser-item">
                            <span className="browser-name">Firefox</span>
                            <span className="support-status supported">
                                ✓ Hỗ trợ
                            </span>
                        </div>
                        <div className="browser-item">
                            <span className="browser-name">Safari</span>
                            <span className="support-status supported">
                                ✓ Hỗ trợ
                            </span>
                        </div>
                        <div className="browser-item">
                            <span className="browser-name">Edge</span>
                            <span className="support-status supported">
                                ✓ Hỗ trợ
                            </span>
                        </div>
                        <div className="browser-item">
                            <span className="browser-name">Opera</span>
                            <span className="support-status supported">
                                ✓ Hỗ trợ
                            </span>
                        </div>
                    </div>
                </section>
            </div>

            <div className="demo-footer">
                <p>
                    <strong>Plyr</strong> - Một media player đơn giản, dễ tiếp
                    cận và có thể tùy chỉnh
                </p>
                <p>
                    Được phát triển bởi{" "}
                    <a
                        href="https://github.com/sampotts"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @sampotts
                    </a>
                    với sự đóng góp từ cộng đồng mã nguồn mở
                </p>
            </div>
        </div>
    );
};

export default PlyrDemoPage;
