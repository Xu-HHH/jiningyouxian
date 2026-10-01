<template>
  <section id="home" class="hero">
    <!-- 中国广电宣传视频背景 -->
    <video
      class="hero-video"
      aria-hidden="true"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      src="/hero.mp4"
    ></video>

    <div class="hero-overlay" aria-hidden="true"></div>

    <div class="hero-content">
      <h1 class="hero-title">山东有线&nbsp; 家的守望</h1>
      <p class="hero-sub">智能终端用户数量位居全国广电网络行业第一</p>
    </div>

    <a class="scroll-hint" href="#recommend" aria-label="查看更多">
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14" />
        <path d="m19 12-7 7-7-7" />
      </svg>
    </a>

    <button class="help-btn" type="button" aria-label="帮助">
      <span>?</span>
    </button>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  min-height: 640px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #040d1c;
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #040d1c;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(2, 6, 12, 0.55) 0%, rgba(2, 6, 12, 0.3) 45%, rgba(5, 10, 18, 0.65) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 24px;
}

.hero-title {
  margin: 0;
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 800;
  letter-spacing: 0.2em;
  text-indent: 0.2em;
  color: #fff;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.8);
  animation: rise 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero-sub {
  margin: 18px 0 0;
  font-size: clamp(13px, 1.4vw, 16px);
  letter-spacing: 0.18em;
  text-indent: 0.18em;
  color: rgba(255, 255, 255, 0.78);
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.7);
  animation: rise 1.2s 0.12s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scroll-hint {
  position: absolute;
  left: 50%;
  bottom: 28px;
  transform: translateX(-50%);
  z-index: 3;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.85);
  transition: background 0.2s, transform 0.2s;
}
.scroll-hint:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-50%) translateY(3px);
}

.help-btn {
  position: absolute;
  right: 32px;
  bottom: 32px;
  z-index: 3;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.85);
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.help-btn:hover {
  background: rgba(255, 255, 255, 0.18);
  transform: translateY(-2px);
}
.help-btn span {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
}

@media (max-width: 900px) {
  .help-btn {
    right: 16px;
    bottom: 20px;
    width: 42px;
    height: 42px;
  }
}
</style>
