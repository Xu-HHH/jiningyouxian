<script setup>
</script>

<template>
  <section class="guanyu-page">
    <div class="guanyu-inner">
      <p class="guanyu-eyebrow">ABOUT US</p>
      <h1 class="guanyu-title">关于企业</h1>
            <a class="guanyu-btn" href="index.html">返回首页</a>
    </div>
  </section>
</template>

<style scoped>
.guanyu-page {
  min-height: calc(100vh - 72px);
  display: flex; align-items: center; justify-content: center;
  background: #fff; padding: 80px 24px;
}
.guanyu-inner { text-align: center; max-width: 640px; }
.guanyu-eyebrow {
  font-size: 13px; letter-spacing: 6px; color: rgba(47, 111, 184, 0.9); margin-bottom: 16px;
  animation: guanyu-float-in 1.2s ease both;
}
.guanyu-title {
  font-size: clamp(34px, 5.4vw, 52px); font-weight: 900; letter-spacing: 4px; color: #0b1220;
  animation: guanyu-float-in 1.2s ease 0.2s both;
}
.guanyu-btn {
  display: inline-block; margin-top: 40px;
  padding: 13px 40px; border-radius: 6px;
  background: #0b1220; color: #fff;
  font-size: 14px; letter-spacing: 3px; text-decoration: none;
  transition: background 0.2s, transform 0.2s;
  animation: guanyu-float-in 1.2s ease 0.7s both;
}
.guanyu-btn:hover { background: #2f6fb8; transform: translateY(-2px); }
@keyframes guanyu-float-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
