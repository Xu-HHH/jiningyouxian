<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

const videos = [
  { src: '/videos/v1.mp4', label: '视频1' },
  { src: '/videos/v2.mp4', label: '视频2' },
  { src: '/videos/v3.mp4', label: '视频3' },
  { src: '/videos/v4.mp4', label: '视频4' },
  { src: '/videos/v5.mp4', label: '视频5' },
  { src: '/videos/v6.mp4', label: '视频6' }
]

const total = videos.length
const active = ref(0)
const paused = ref(false)
const hovering = ref(false)
const showCtrl = ref(false)
const activeVideo = ref(null)

const cur = computed(() => videos[active.value])
const prev = computed(() => videos[(active.value + total - 1) % total])
const next = computed(() => videos[(active.value + 1) % total])

// 切到新视频:静音自动播放(浏览器策略要求自动播放必须静音)
function startCurrent() {
  nextTick(() => {
    const v = activeVideo.value
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  })
}

function go(dir) {
  active.value = (active.value + dir + total) % total
  paused.value = false
  startCurrent()
}

// 悬停视频时出现的按钮:播放(开声音)/暂停
function togglePlay() {
  const v = activeVideo.value
  if (!v) return
  if (paused.value) {
    paused.value = false
    v.muted = false
    v.play().catch(() => {})
  } else {
    paused.value = true
    v.pause()
  }
}

let timer = null
onMounted(() => {
  startCurrent()
  // 自动轮播,悬停在轮播区或手动暂停时暂停轮播
  timer = setInterval(() => {
    if (!hovering.value && !paused.value) go(1)
  }, 12000)
})
onBeforeUnmount(() => clearInterval(timer))
</script>

<template>
  <section id="recommend" class="recommend">
    <p class="sec-eyebrow">JingNingYouXian</p>
    <h2 class="sec-title">济宁有线</h2>

    <div class="carousel" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <div class="car-card car-peek">
        <video
          :key="'p' + prev.src"
          :src="prev.src"
          muted
          loop
          playsinline
          preload="metadata"
          aria-hidden="true"
        ></video>
        <div class="card-shade"></div>
      </div>

      <div class="car-card car-active" @mouseenter="showCtrl = true" @mouseleave="showCtrl = false">
        <video
          ref="activeVideo"
          :key="'c' + cur.src"
          class="car-video"
          :src="cur.src"
          loop
          playsinline
          preload="auto"
        ></video>

        <button
          class="play-badge"
          :class="{ 'is-show': showCtrl || paused }"
          type="button"
          :aria-label="paused ? '播放并开启声音' : '暂停'"
          @click="togglePlay"
        >
          <svg v-if="!paused" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8 5h3v14H8zM13 5h3v14h-3z" />
          </svg>
          <svg v-else viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>

        <button class="car-arrow car-arrow--left" type="button" aria-label="上一个" @click="go(-1)">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button class="car-arrow car-arrow--right" type="button" aria-label="下一个" @click="go(1)">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div class="car-card car-peek">
        <video
          :key="'n' + next.src"
          :src="next.src"
          muted
          loop
          playsinline
          preload="metadata"
          aria-hidden="true"
        ></video>
        <div class="card-shade"></div>
      </div>
    </div>

    <p class="car-caption">
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="1.6">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3.2" fill="currentColor" stroke="none" />
      </svg>
      {{ cur.label }}
    </p>
  </section>
</template>

<style scoped>
.recommend {
  position: relative;
  padding: 128px 24px 150px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.sec-eyebrow {
  margin: 0;
  font-size: 13px;
  letter-spacing: 5px;
  color: rgba(11, 18, 32, 0.45);
}

.sec-title {
  margin: 10px 0 0;
  font-size: clamp(26px, 3.6vw, 44px);
  font-weight: 800;
  letter-spacing: 10px;
  text-indent: 10px;
  color: #0b1220;
}

.carousel {
  margin-top: 44px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 18px;
  width: min(1120px, 94vw);
}

.car-card {
  position: relative;
  overflow: hidden;
  background: #000;
}

.car-peek {
  width: 220px;
  aspect-ratio: 16 / 9;
  opacity: 0.55;
}
.car-peek video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card-shade {
  position: absolute;
  inset: 0;
  background: rgba(4, 10, 18, 0.4);
}

.car-active {
  width: 620px;
  max-width: 58vw;
  aspect-ratio: 16 / 9;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.5);
}
.car-video {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
  animation: car-fade 0.6s ease both;
}
@keyframes car-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.play-badge {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  width: 54px;
  height: 54px;
  border-radius: 14px;
  border: none;
  background: rgba(255, 255, 255, 0.88);
  color: #0b1220;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s, visibility 0.25s, transform 0.2s, background 0.2s;
}
.play-badge.is-show {
  opacity: 1;
  visibility: visible;
}
.play-badge.is-show:hover {
  transform: translate(-50%, -50%) scale(1.08);
  background: #fff;
}

/* 透明方向箭头:默认半透明,hover 时凸显 */
.car-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #fff;
  cursor: pointer;
  background: rgba(8, 10, 14, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(6px);
  transition: background 0.2s, transform 0.2s, border-color 0.2s, box-shadow 0.2s, color 0.2s;
}
.car-arrow--left {
  left: 14px;
}
.car-arrow--right {
  right: 14px;
}
.car-arrow:hover {
  background: rgba(255, 255, 255, 0.92);
  color: #0b1220;
  border-color: rgba(255, 255, 255, 0.92);
  box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.22), 0 8px 22px rgba(0, 0, 0, 0.4);
  transform: translateY(-50%) scale(1.14);
}

.car-caption {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  letter-spacing: 2px;
  color: rgba(11, 18, 32, 0.6);
}

@media (max-width: 900px) {
  .car-peek {
    display: none;
  }
  .carousel {
    width: 92vw;
  }
  .car-active {
    width: 100%;
    max-width: none;
  }
  .car-arrow--left {
    left: 10px;
  }
  .car-arrow--right {
    right: 10px;
  }
}
</style>
