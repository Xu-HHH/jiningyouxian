<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <p class="footer-brand">中国广电山东网络有限公司济宁分公司</p>

      <div class="footer-legal">
        <p>Copyright © 2026-9999 济宁分公司运维中心</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: #050505;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 18px 24px 16px;
}

.footer-inner {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.footer-brand {
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  text-indent: 0;
  color: rgba(255, 255, 255, 0.85);
}

.footer-links {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-size: 13px;
}
.footer-links a {
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;
}
.footer-links a:hover {
  color: #fff;
}
.footer-links .dot {
  color: rgba(255, 255, 255, 0.2);
}

.footer-legal {
  margin-top: 10px;
  display: grid;
  gap: 6px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.32);
}
</style>
