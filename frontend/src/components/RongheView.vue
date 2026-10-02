<script setup>
</script>

<template>
  <section class="ronghe-page">
    <div class="ronghe-inner">
      <div class="ronghe-gear ronghe-gear-a" aria-hidden="true"><svg viewBox="0 0 100 100" width="110" height="110" aria-hidden="true">
  <g fill="#0b1220">
    <rect x="44" y="6" width="12" height="18" rx="4" />
    <rect x="44" y="76" width="12" height="18" rx="4" />
    <rect x="6" y="44" width="18" height="12" rx="4" />
    <rect x="76" y="44" width="18" height="12" rx="4" />
    <rect x="15" y="15" width="12" height="18" rx="4" transform="rotate(45 21 24)" />
    <rect x="73" y="67" width="12" height="18" rx="4" transform="rotate(45 79 76)" />
    <rect x="15" y="67" width="12" height="18" rx="4" transform="rotate(-45 21 76)" />
    <rect x="73" y="15" width="12" height="18" rx="4" transform="rotate(-45 79 24)" />
    <circle cx="50" cy="50" r="34" />
  </g>
  <circle cx="50" cy="50" r="15" fill="#fff" />
</svg></div>
      <div class="ronghe-gear ronghe-gear-b" aria-hidden="true"><svg viewBox="0 0 100 100" width="58" height="58" aria-hidden="true">
  <g fill="#2f6fb8">
    <rect x="44" y="6" width="12" height="18" rx="4" />
    <rect x="44" y="76" width="12" height="18" rx="4" />
    <rect x="6" y="44" width="18" height="12" rx="4" />
    <rect x="76" y="44" width="18" height="12" rx="4" />
    <rect x="15" y="15" width="12" height="18" rx="4" transform="rotate(45 21 24)" />
    <rect x="73" y="67" width="12" height="18" rx="4" transform="rotate(45 79 76)" />
    <rect x="15" y="67" width="12" height="18" rx="4" transform="rotate(-45 21 76)" />
    <rect x="73" y="15" width="12" height="18" rx="4" transform="rotate(-45 79 24)" />
    <circle cx="50" cy="50" r="34" />
  </g>
  <circle cx="50" cy="50" r="15" fill="#fff" />
</svg></div>

      <p class="ronghe-eyebrow">COMING SOON</p>
      <h1 class="ronghe-title">页面装修中</h1>
      <p class="ronghe-desc">融合套餐页面正在精心筹备，稍后与您见面，敬请期待。</p>
      <div class="ronghe-progress"><div class="ronghe-progress-bar"></div></div>
      <a class="ronghe-btn" href="index.html">返回首页</a>
      <div class="ronghe-photo"><img src="/site-photo.png" alt="济宁有线" /></div>
    </div>
  </section>
</template>

<style scoped>
.ronghe-page {
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 80px 24px;
}
.ronghe-inner {
  position: relative;
  text-align: center;
  max-width: 560px;
}

/* 齿轮装饰：大齿轮慢速正转，小齿轮反向 */
.ronghe-gear { position: absolute; opacity: 0.9; }
.ronghe-gear-a { top: -64px; left: -70px; animation: gear-spin 16s linear infinite; }
.ronghe-gear-b { top: -34px; right: -46px; animation: gear-spin 9s linear infinite reverse; }
@keyframes gear-spin { to { transform: rotate(360deg); } }

.ronghe-eyebrow {
  font-size: 13px; letter-spacing: 6px; color: rgba(47, 111, 184, 0.9);
  margin-bottom: 16px;
  animation: ronghe-float-in 1.2s ease both;
}
.ronghe-title {
  font-size: clamp(34px, 5.4vw, 52px); font-weight: 900; letter-spacing: 4px; color: #0b1220;
  animation: ronghe-float-in 1.2s ease 0.2s both;
}
.ronghe-desc {
  margin-top: 16px; font-size: 15px; color: rgba(11, 18, 32, 0.55);
  animation: ronghe-float-in 1.2s ease 0.4s both;
}
.ronghe-progress {
  width: 280px; height: 4px; margin: 40px auto 0;
  background: rgba(11, 18, 32, 0.08); border-radius: 2px; overflow: hidden;
  animation: ronghe-float-in 1.2s ease 0.6s both;
}
.ronghe-progress-bar {
  height: 100%; width: 36%;
  background: linear-gradient(90deg, #2f6fb8, #6aa5e8);
  border-radius: 2px;
  animation: ronghe-slide 1.6s ease-in-out infinite alternate;
}
@keyframes ronghe-slide {
  from { transform: translateX(-60%); }
  to { transform: translateX(190%); }
}
.ronghe-btn {
  display: inline-block; margin-top: 36px;
  padding: 13px 40px; border-radius: 6px;
  background: #0b1220; color: #fff;
  font-size: 14px; letter-spacing: 3px; text-decoration: none;
  transition: background 0.2s, transform 0.2s;
  animation: ronghe-float-in 1.2s ease 0.8s both;
}
.ronghe-btn:hover { background: #2f6fb8; transform: translateY(-2px); }
.ronghe-photo {
  width: 320px; margin: 48px auto 0;
  border-radius: 12px; overflow: hidden;
  box-shadow: 0 24px 48px -20px rgba(11, 18, 32, 0.35);
  animation: ronghe-float-in 1.2s ease 1.1s both;
}
.ronghe-photo img { width: 100%; display: block; }
@keyframes ronghe-float-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
