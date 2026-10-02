<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Cross-fading hero background photos (each shown for about 5s)
const bgs = ['tv-photo-1.png', 'tv-photo-2.png', 'tv-photo-3.png', 'tv-photo-4.png']
const active = ref(0)
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    active.value = (active.value + 1) % bgs.length
  }, 5000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const plans = [
  { name: '一年套餐', tag: '入门之选', price: '？？？', unit: '元', accent: false, features: ['基础点播频道', '畅享高清4K频道', '7天节目回放', '24小时响应客服', '免费上门维护'] },
  { name: '两年套餐', tag: '家庭热门', price: '？？？', unit: '元', accent: false, features: ['基础点播频道', '畅享高清4K频道', '7天节目回放', '24小时响应客服', '免费上门维护'] },
  { name: '三年套餐', tag: '品质生活', price: '？？？', unit: '元', accent: true, features: ['基础点播频道', '畅享高清4K频道', '7天节目回放', '24小时响应客服', '免费上门维护'] },
  { name: '四年套餐', tag: '节日专享', price: '？？？', unit: '元', accent: false, festival: true, features: ['基础点播频道', '畅享高清4K频道', '7天节目回放', '24小时响应客服', '免费上门维护'] }
]

// Scroll-triggered expanding video module (expand + autoplay)
const videoOpen = ref(false)
const videoEl = ref(null)
const videoSection = ref(null)
let videoObserver = null
onMounted(() => {
  const el = videoSection.value
  if (!el) return
  videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !videoOpen.value) {
        videoOpen.value = true
        const v = videoEl.value
        if (v) {
          v.muted = true
          v.play().catch(() => {})
        }
        videoObserver.disconnect()
      }
    })
  }, { threshold: 0, rootMargin: '0px 0px -15% 0px' })
  videoObserver.observe(el)
})
onUnmounted(() => {
  if (videoObserver) videoObserver.disconnect()
})
</script>

<template>
  <div class="tv-page">
    <section class="tv-hero">
      <div v-for="(bg, i) in bgs" :key="i" class="tv-bg" :class="{ on: i === active }" :style="{ backgroundImage: 'url(' + bg + ')' }"></div>
      <div class="tv-hero-inner">
        <p class="tv-eyebrow">济宁有线 · 有线电视套餐</p>
        <h1 class="tv-title">家的守望，随心看</h1>
        <p class="tv-desc">济宁有线电视套餐，覆盖直播、点播、4K 超清，总有一款适合你的家。</p>
      </div>
    </section>

    <section class="tv-video" ref="videoSection">
      <div class="tv-video-head" :class="{ in: videoOpen }">
        <h2 class="tv-video-title"><span class="tv-video-big">4K超高清</span>智能终端产品——享TV</h2>
      </div>
      <div class="tv-video-wrap" :class="{ open: videoOpen }">
        <video ref="videoEl" class="tv-video-el" controls loop playsinline preload="metadata" muted>
          <source src="x-tv-video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>

    <section class="tv-plans">
      <div class="plans-head">
        <p class="plans-eyebrow">选择你的套餐</p>
        <h2 class="plans-title">有线电视套餐</h2>
        <p class="plans-desc">按需选择，随时升级，让全家尽享高清视听。</p>
      </div>

      <div class="plans-grid">
        <article v-for="p in plans" :key="p.name" class="plan" :class="{ 'plan--hot': p.accent }">
          <span v-if="p.accent" class="plan-flag">推荐</span>
          <span v-if="p.festival" class="plan-flag plan-flag--festival">节日优惠</span>
          <h3 class="plan-name">{{ p.name }}</h3>
          <p class="plan-tag">{{ p.tag }}</p>
          <div class="plan-price">
            <span class="num">{{ p.price }}</span><span class="per">{{ p.unit }}</span>
          </div>
          <ul class="plan-list">
            <li v-for="f in p.features" :key="f">{{ f }}</li>
          </ul>
          <button class="plan-btn" :class="{ 'plan-btn--hot': p.accent }">立即办理</button>
        </article>
      </div>

      <p class="plans-note">* 以上价格仅供参考，具体以营业厅公示为准。</p>
    </section>
  </div>
</template>

<style scoped>
.tv-page { min-height: 100vh; background: #fff; }

.tv-hero {
  position: relative;
  overflow: hidden;
  padding: 150px 24px 84px;
  background: #0b1220;
  color: #fff;
  text-align: center;
}
.tv-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.4s ease;
}
.tv-bg.on {
  z-index: 1;
  opacity: 1;
}
.tv-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(180deg, rgba(11, 18, 32, 0.45) 0%, rgba(11, 18, 32, 0.72) 100%);
  pointer-events: none;
}
.tv-hero-inner {
  position: relative;
  z-index: 3;
}
.tv-eyebrow { font-size: 13px; letter-spacing: 4px; color: rgba(255,255,255,0.6); margin-bottom: 18px; }
.tv-title { font-size: clamp(34px, 6vw, 56px); font-weight: 800; letter-spacing: 2px; }
.tv-desc { margin-top: 16px; font-size: 15px; color: rgba(255,255,255,0.6); }

@keyframes tv-float-in {
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: translateY(0); }
}
.tv-eyebrow { animation: tv-float-in 1.4s ease both; }
.tv-title { animation: tv-float-in 1.4s ease 0.2s both; }
.tv-desc { animation: tv-float-in 1.4s ease 0.4s both; }

.tv-plans { padding: clamp(64px, 9vw, 110px) 24px; background: #fff; }
.plans-head { text-align: center; max-width: 560px; margin: 0 auto clamp(40px, 6vw, 64px); }
.plans-eyebrow { font-size: 13px; letter-spacing: 5px; color: rgba(47,111,184,0.9); margin-bottom: 14px; }
.plans-title { font-size: clamp(28px, 4.4vw, 44px); font-weight: 800; letter-spacing: 2px; color: #0b1220; }
.plans-desc { margin-top: 14px; font-size: 15px; color: rgba(11,18,32,0.55); }

.plans-grid { max-width: 1080px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
.plan {
  position: relative; background: #f7f9fc; border: 1px solid rgba(11,18,32,0.08);
  border-radius: 10px; padding: 30px 24px; display: flex; flex-direction: column;
  transition: transform .3s ease, box-shadow .3s ease, background .3s ease;
}
.plan:hover { transform: translateY(-6px); box-shadow: 0 24px 48px -24px rgba(11,18,32,0.25); background: #fff; }
.plan--hot { background: #f7f9fc; }
.plan--hot:hover { background: #fff; }
.plan-flag { position: absolute; top: 14px; right: 14px; font-size: 11px; background: #2f6fb8; color: #fff; padding: 3px 10px; border-radius: 20px; letter-spacing: 1px; }
.plan-flag--festival { background: #d64545; }
.plan-name { font-size: 20px; font-weight: 700; letter-spacing: 1px; color: #0b1220; }
.plan-tag { font-size: 12px; color: rgba(47,111,184,0.9); margin-top: 6px; }
.plan-price { margin: 18px 0 4px; color: rgba(11,18,32,0.6); display: flex; align-items: baseline; }
.plan-price .cur { font-size: 14px; margin-right: 2px; }
.plan-price .num { font-size: 40px; font-weight: 800; color: #2f6fb8; line-height: 1; }
.plan-price .per { font-size: 13px; margin-left: 4px; }
.plan-list { list-style: none; margin: 18px 0 24px; display: flex; flex-direction: column; gap: 10px; }
.plan-list li { font-size: 13px; color: rgba(11,18,32,0.6); padding-left: 20px; position: relative; line-height: 1.5; }
.plan-list li::before { content: ''; position: absolute; left: 0; top: 6px; width: 12px; height: 12px; border-radius: 50%; background: rgba(47,111,184,0.15); }
.plan-btn {
  margin-top: auto; padding: 12px; border-radius: 6px; border: 1px solid rgba(47,111,184,0.4);
  background: transparent; color: #2f6fb8; font-size: 14px; font-weight: 600; cursor: pointer; transition: all .2s;
}
.plan-btn:hover { background: #2f6fb8; color: #fff; }
.plans-note { text-align: center; margin-top: 40px; font-size: 12px; color: rgba(11,18,32,0.4); }

@media (max-width: 900px) { .plans-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 560px) { .plans-grid { grid-template-columns: 1fr; } }
.tv-video { padding: clamp(56px, 8vw, 90px) 0 clamp(64px, 9vw, 110px); background: #fff; }
.tv-video-head { margin: 0 0 44px clamp(24px, 3.75vw, 48px); text-align: left; opacity: 0; }
.tv-video-head.in { animation: tv-float-in 1.4s ease 0.25s both; opacity: 1; }
.tv-video-title { font-size: clamp(20px, 2.6vw, 30px); font-weight: 700; letter-spacing: 1px; color: #0b1220; }
.tv-video-big { font-size: clamp(38px, 6vw, 64px); font-weight: 900; letter-spacing: 2px; color: #0b1220; }
.tv-video-wrap {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.9s ease;
  display: flex;
  justify-content: center;
}
.tv-video-wrap.open { max-height: 1000px; }
.tv-video-el {
  width: 100%;
  display: block;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  background: #000;
  opacity: 0;
  transition: opacity 0.6s ease;
}
.tv-video-wrap.open .tv-video-el { opacity: 1; }
</style>
