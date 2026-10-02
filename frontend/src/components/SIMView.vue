<script setup>
import { reactive, computed } from "vue"

const introFeatures = [
  { title: '192 红色号段', desc: '专属红色号段，承载光影记忆，一卡彰显尊崇身份。' },
  { title: '5G 千兆网络', desc: '基于 700MHz 黄金频段，覆盖广、穿墙强，城乡信号更稳定。' },
  { title: '固移融合', desc: '与广电宽带、有线电视一卡协同，家庭组合更划算。' },
  { title: '便捷办理', desc: '线上选卡、实名核验，专员免费上门激活安装。' }
]

const plans = [
  { name: '畅享卡', tag: '入门之选', price: '29', unit: '元/月', accent: false, special: false, features: ['100GB 5G 全国流量', '100 分钟通话', '来电显示', '4G/5G 双模终端支持'] },
  { name: '双百卡', tag: '家庭热门', price: '39', unit: '元/月', accent: true, special: false, features: ['200GB 5G 全国流量', '300 分钟通话', '全屋 WiFi 6 终端 1 台', '5G 优先网络接入'] },
  { name: '崇军卡', tag: '尊崇专属', price: '19', unit: '元/月', accent: false, special: true, features: ['1927 红色号段', '100GB 5G 全国流量', '200 分钟通话', '崇军专属关怀权益'] }
]

const steps = [
  { no: '01', title: '在线选卡', desc: '选择心仪的号卡套餐与号码段，在线提交办理申请。' },
  { no: '02', title: '实名核验', desc: '身份证实名加人脸核验，保障账户安全。' },
  { no: '03', title: '上门激活', desc: '专员免费上门交付，现场完成激活与网络测试。' }
]

// 立体翻转卡片：正面 sim2，背面 sim1；不拖拽时缓慢自动旋转
const cardRot = reactive({ x: 0, y: -18 })
const cardStyle = computed(() => "transform: rotateX(" + cardRot.x + "deg) rotateY(" + cardRot.y + "deg)")
let dragging = false
let lastInteract = 0
let lastT = 0
const tick = (t) => {
  if (!dragging && t - lastInteract > 1200) {
    const dt = Math.min(0.05, (t - lastT) / 1000)
    cardRot.y += dt * 12
    cardRot.x *= 0.98
    if (Math.abs(cardRot.x) < 0.05) cardRot.x = 0
  }
  lastT = t
  requestAnimationFrame(tick)
}
requestAnimationFrame(tick)
const onCardPointerDown = (e) => {
  e.preventDefault()
  dragging = true
  const startX = e.clientX
  const startY = e.clientY
  const startRy = cardRot.y
  const startRx = cardRot.x
  const move = (ev) => {
    cardRot.y = startRy + (ev.clientX - startX) * 0.55
    cardRot.x = Math.max(-45, Math.min(45, startRx - (ev.clientY - startY) * 0.4))
  }
  const up = () => {
    window.removeEventListener("pointermove", move)
    window.removeEventListener("pointerup", up)
    document.body.style.userSelect = ""
    dragging = false
    lastInteract = performance.now()
  }
  document.body.style.userSelect = "none"
  window.addEventListener("pointermove", move)
  window.addEventListener("pointerup", up)
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="sim-page">
    <section class="sim-hero">
      <div class="sim-hero-inner">
        <div class="sim-hero-text">
          <p class="sim-eyebrow">CHINA BROADNET · 5G</p>
          <h1 class="sim-title">广电5G<span class="sim-title-sub"> 号卡</span></h1>
          <p class="sim-sub">700M频段 · 千兆网络 · 固移融合，一张卡片联通全家</p>
          <div class="sim-hero-cta">
            <button class="sim-btn" type="button" @click="scrollTo('sim-plans')">查看号卡套餐</button>
            <button class="sim-btn sim-btn-ghost" type="button" @click="scrollTo('sim-steps')">办理流程</button>
          </div>
        </div>
        <div class="sim-hero-card">
          <div class="sim-card3d-wrap">
            <div class="sim-card3d" :style="cardStyle" @pointerdown="onCardPointerDown" title="按住拖动，翻转查看卡背">
              <div class="sim-face sim-face-front"><img src="/sim2.png" alt="广电5G号卡正面" draggable="false"></div>
              <div class="sim-face sim-face-back"><img src="/sim1.png" alt="广电5G号卡背面" draggable="false"></div>
            </div>
          </div>
          <p class="sim-card-hint">按住卡片拖动，可立体翻转查看卡背</p>
        </div>
      </div>
    </section>

    <section class="sim-intro" id="sim-intro">
      <div class="sim-section-head">
        <p class="sim-sec-eyebrow">SIM CARD</p>
        <h2 class="sim-sec-title">关于广电5G手机卡</h2>
        <p class="sim-sec-desc">面向家庭与尊崇用户的 5G 号卡服务，号段、网络、权益一次说清。</p>
      </div>
      <div class="sim-intro-grid">
        <div v-for="f in introFeatures" :key="f.title" class="sim-intro-item">
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <section class="sim-plans" id="sim-plans">
      <div class="sim-section-head">
        <p class="sim-sec-eyebrow">SIM PLANS</p>
        <h2 class="sim-sec-title">号卡套餐</h2>
        <p class="sim-sec-desc">按需选择，随时升级，让全家畅享 5G 高速网络。</p>
      </div>
      <div class="sim-plans-grid">
        <article v-for="p in plans" :key="p.name" class="sim-plan">
          <span v-if="p.accent" class="sim-plan-flag">推荐</span>
          <span v-if="p.special" class="sim-plan-flag sim-plan-flag--red">专属</span>
          <h3 class="sim-plan-name">{{ p.name }}</h3>
          <p class="sim-plan-tag">{{ p.tag }}</p>
          <div class="sim-plan-price"><span class="num">{{ p.price }}</span><span class="per">/ {{ p.unit }}</span></div>
          <ul class="sim-plan-list">
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>
          <button class="sim-plan-btn" type="button">立即办理</button>
        </article>
      </div>
      <p class="sim-plans-note">* 以上套餐内容仅供参考，具体以营业厅公示为准。</p>
    </section>

    <section class="sim-steps" id="sim-steps">
      <div class="sim-section-head">
        <p class="sim-sec-eyebrow">PROCESS</p>
        <h2 class="sim-sec-title">办理流程</h2>
      </div>
      <div class="sim-steps-grid">
        <div v-for="s in steps" :key="s.no" class="sim-step">
          <span class="sim-step-no">{{ s.no }}</span>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sim-page { min-height: 100vh; background: #fff; }

.sim-hero {
  position: relative;
  background: linear-gradient(180deg, #0b1220 0%, #101a2e 62%, #0d1424 100%);
  overflow: hidden;
}
.sim-hero::before {
  content: '';
  position: absolute;
  top: -20%;
  right: -8%;
  width: 46%;
  height: 120%;
  background: radial-gradient(closest-side, rgba(47,111,184,0.28), transparent 72%);
  pointer-events: none;
}
.sim-hero-inner {
  position: relative;
  max-width: 1080px;
  margin: 0 auto;
  padding: clamp(150px, 22vh, 210px) 40px clamp(80px, 12vh, 140px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}
.sim-hero-text { flex: 1; min-width: 0; }
.sim-eyebrow { font-size: 13px; letter-spacing: 6px; color: rgba(255,255,255,0.55); margin-bottom: 18px; }
.sim-title { font-size: clamp(40px, 6vw, 72px); font-weight: 900; color: #fff; letter-spacing: 2px; line-height: 1.1; }
.sim-title-sub { font-weight: 300; color: rgba(255,255,255,0.85); }
.sim-sub { margin-top: 16px; font-size: 15px; color: rgba(255,255,255,0.55); letter-spacing: 1px; }
.sim-hero-cta { margin-top: 34px; display: flex; gap: 14px; flex-wrap: wrap; }
.sim-btn {
  font-size: 14px; letter-spacing: 2px; padding: 13px 30px; border-radius: 6px;
  background: #2f6fb8; color: #fff; border: 1px solid #2f6fb8; cursor: pointer;
  transition: background .25s ease;
}
.sim-btn:hover { background: #3f83d6; }
.sim-btn-ghost { background: transparent; color: rgba(255,255,255,0.85); border-color: rgba(255,255,255,0.35); }
.sim-btn-ghost:hover { background: rgba(255,255,255,0.12); }

.sim-hero-card { flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 14px; }
.sim-card3d-wrap {
  perspective: 900px;
  width: clamp(170px, 16vw, 230px);
  aspect-ratio: 0.72;
  animation: sim-card-in 0.9s cubic-bezier(0.22, 0.8, 0.3, 1) both;
}
@keyframes sim-card-in {
  from { transform: translateX(340%); opacity: 0; }
  60% { opacity: 1; }
  to { transform: translateX(0); opacity: 1; }
}
.sim-card3d {
  position: relative; width: 100%; height: 100%;
  transform-style: preserve-3d; cursor: grab;
  touch-action: none; user-select: none;
}
.sim-card3d:active { cursor: grabbing; }
.sim-face {
  position: absolute; inset: 0;
  border-radius: 14px; overflow: hidden;
  backface-visibility: hidden; -webkit-backface-visibility: hidden;
  box-shadow: 0 34px 64px -20px rgba(0, 0, 0, 0.55);
}
.sim-face img { width: 100%; height: 100%; object-fit: contain; display: block; pointer-events: none; }
.sim-face-back { transform: rotateY(180deg); }
.sim-card-hint { font-size: 11px; letter-spacing: 2px; color: rgba(255, 255, 255, 0.45); }

.sim-section-head { text-align: center; max-width: 560px; margin: 0 auto clamp(40px, 6vw, 64px); padding: 0 24px; }
.sim-sec-eyebrow { font-size: 13px; letter-spacing: 5px; color: rgba(47,111,184,0.9); margin-bottom: 14px; }
.sim-sec-title { font-size: clamp(28px, 4.4vw, 44px); font-weight: 800; letter-spacing: 2px; color: #0b1220; }
.sim-sec-desc { margin-top: 14px; font-size: 15px; color: rgba(11,18,32,0.55); }

.sim-intro { padding: clamp(70px, 10vw, 120px) 24px; background: #fff; }
.sim-intro-grid { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
.sim-intro-item {
  background: #f7f9fc; border: 1px solid rgba(11,18,32,0.08); border-radius: 10px;
  padding: 28px 24px; transition: transform .3s ease, box-shadow .3s ease, background .3s ease;
}
.sim-intro-item:hover { transform: translateY(-6px); box-shadow: 0 24px 48px -24px rgba(11,18,32,0.25); background: #fff; }
.sim-intro-item h3 { font-size: 17px; font-weight: 700; color: #0b1220; letter-spacing: 1px; }
.sim-intro-item p { margin-top: 10px; font-size: 13px; line-height: 1.7; color: rgba(11,18,32,0.6); }

.sim-plans { padding: clamp(70px, 10vw, 120px) 24px; background: #f5f7fa; }
.sim-plans-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.sim-plan {
  position: relative; background: #fff; border: 1px solid rgba(11,18,32,0.08); border-radius: 10px;
  padding: 30px 24px; display: flex; flex-direction: column;
  transition: transform .3s ease, box-shadow .3s ease;
}
.sim-plan:hover { transform: translateY(-6px); box-shadow: 0 24px 48px -24px rgba(11,18,32,0.25); }
.sim-plan-flag { position: absolute; top: 14px; right: 14px; font-size: 11px; background: #2f6fb8; color: #fff; padding: 3px 10px; border-radius: 20px; letter-spacing: 1px; }
.sim-plan-flag--red { background: #d64545; }
.sim-plan-name { font-size: 20px; font-weight: 700; letter-spacing: 1px; color: #0b1220; }
.sim-plan-tag { font-size: 12px; color: rgba(47,111,184,0.9); margin-top: 6px; }
.sim-plan-price { margin: 18px 0 4px; display: flex; align-items: baseline; color: rgba(11,18,32,0.6); }
.sim-plan-price .num { font-size: 40px; font-weight: 800; color: #2f6fb8; line-height: 1; }
.sim-plan-price .per { font-size: 13px; margin-left: 4px; }
.sim-plan-list { list-style: none; margin: 18px 0 24px; display: flex; flex-direction: column; gap: 10px; }
.sim-plan-list li { font-size: 13px; color: rgba(11,18,32,0.6); padding-left: 20px; position: relative; line-height: 1.5; }
.sim-plan-list li::before { content: ''; position: absolute; left: 0; top: 6px; width: 12px; height: 12px; border-radius: 50%; background: rgba(47,111,184,0.15); }
.sim-plan-btn {
  margin-top: auto; padding: 11px 0; width: 100%; border-radius: 8px;
  border: 1px solid rgba(47,111,184,0.45); background: transparent; color: #2f6fb8;
  font-size: 14px; letter-spacing: 3px; cursor: pointer; transition: background .25s ease, color .25s ease;
}
.sim-plan-btn:hover { background: #2f6fb8; color: #fff; }
.sim-plans-note { text-align: center; margin-top: 40px; font-size: 12px; color: rgba(11,18,32,0.4); }

.sim-steps { padding: clamp(70px, 10vw, 120px) 24px; background: #fff; }
.sim-steps-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.sim-step { border: 1px solid rgba(11,18,32,0.08); border-radius: 10px; padding: 28px 24px; background: #f7f9fc; }
.sim-step-no { font-size: 30px; font-weight: 900; color: rgba(47,111,184,0.35); letter-spacing: 2px; }
.sim-step h3 { margin-top: 12px; font-size: 17px; font-weight: 700; color: #0b1220; }
.sim-step p { margin-top: 8px; font-size: 13px; line-height: 1.7; color: rgba(11,18,32,0.6); }

@media (max-width: 900px) {
  .sim-intro-grid { grid-template-columns: repeat(2, 1fr); }
  .sim-plans-grid { grid-template-columns: 1fr; }
  .sim-steps-grid { grid-template-columns: 1fr; }
  .sim-hero-inner { flex-direction: column; align-items: center; text-align: center; }
  .sim-hero-cta { justify-content: center; }
}
@media (max-width: 560px) {
  .sim-intro-grid { grid-template-columns: 1fr; }
}
</style>
