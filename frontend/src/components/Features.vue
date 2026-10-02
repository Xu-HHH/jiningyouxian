<script setup>
const features = [
  {
    title: '微插机顶盒',
    desc: '小身材藏着大用处。',
    icon: 'library',
    img: 'stick-box.jpeg'
  },
  {
    title: '4K超高清智能终端产品——享TV',
    desc: '享TV，“享”您所想。',
    icon: 'bolt',
    img: 'xiang-tv.jpeg',
    imgClass: 'card-img--fit'
  },
  {
    title: '广电宽带',
    desc: '广电宽带，稳定畅快还实惠。',
    icon: 'book',
    img: 'guangdian-bb.jpeg'
  },
  {
    title: '广电崇军卡',
    descHtml: '齐鲁崇军行，广电暖兵心，崇军卡享专属<span class="hl-red">1927</span>红色号段',
    icon: 'camera',
    img: 'chongjun-card.gif',
    imgClass: 'card-img--square'
  }
]

const svgOpen = '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
const icons = {
  library: `${svgOpen}<rect x="4" y="4" width="7" height="16" rx="1.5"/><rect x="13" y="4" width="7" height="11" rx="1.5"/><path d="M13 19h7"/></svg>`,
  bolt: `${svgOpen}<path d="M13 3 5 14h6l-1 7 8-11h-6z"/></svg>`,
  book: `${svgOpen}<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z"/><path d="M4 18h16"/></svg>`,
  camera: `${svgOpen}<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13.5" r="4"/><path d="M8 7l1.5-2.5h5L16 7"/></svg>`
}
</script>

<template>
  <section id="features" class="features">
    <div class="section-head">
      <p class="eyebrow">探索</p>
      <h2 class="section-title">为什么选择我们</h2>
      <p class="section-desc">以客户为中心</p>
    </div>

    <div class="cards">
      <!-- 左列:微插机顶盒(自然高度) + 下方小方框(填满剩余行高) -->
      <div class="col-main">
        <article class="card">
          <img
            :src="features[0].img"
            :alt="features[0].title"
            :class="['card-img', features[0].imgClass]"
          />
          <h3 class="card-title">{{ features[0].title }}</h3>
          <p class="card-desc">{{ features[0].desc }}</p>
        </article>
        <div class="mini-box">
          <img src="guangdian-sim.jpeg" alt="广电5G号卡" class="mini-box-img" />
          <h3 class="card-title">广电5G号卡</h3>
          <p class="card-desc">固移融合，慧享全家。</p>
        </div>
      </div>

      <article
        v-for="f in features.slice(1)"
        :key="f.title"
        class="card"
      >
        <img
          v-if="f.img"
          :src="f.img"
          :alt="f.title"
          :class="['card-img', f.imgClass]"
        />
        <div v-else class="card-icon" :class="`icon-${f.icon}`" aria-hidden="true" v-html="icons[f.icon]"></div>
        <h3 class="card-title">{{ f.title }}</h3>
        <p class="card-desc" v-if="f.descHtml" v-html="f.descHtml"></p>
        <p class="card-desc" v-else>{{ f.desc }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.features {
  position: relative;
  padding: clamp(96px, 14vw, 180px) 24px;
  background: #ffffff;
}

.section-head {
  text-align: center;
  max-width: 640px;
  margin: 0 auto clamp(56px, 8vw, 96px);
}
.eyebrow {
  font-size: 13px;
  letter-spacing: 6px;
  text-indent: 6px;
  color: rgba(47, 111, 184, 0.9);
  margin-bottom: 18px;
}
.section-title {
  font-size: clamp(30px, 4.6vw, 48px);
  font-weight: 800;
  letter-spacing: 2px;
  color: #0b1220;
}
.section-desc {
  margin-top: 16px;
  font-size: 15px;
  color: rgba(11, 18, 32, 0.55);
  letter-spacing: 1px;
}

.cards {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.card {
  padding: 40px 36px;
  background: #f7f9fc;
  border: 1px solid rgba(11, 18, 32, 0.08);
  border-radius: 8px;
  transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
  background: #ffffff;
  border-color: rgba(11, 18, 32, 0.14);
  box-shadow: 0 24px 48px -24px rgba(11, 18, 32, 0.25);
}

/* 左列:微插卡片保持自然高度,小方框吸收剩余行高 */
.col-main {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.col-main .card {
  flex: 0 0 auto;
}
.mini-box {
  flex: 1 1 auto;
  min-height: 120px;
  background: #f7f9fc;
  border: 1px solid rgba(11, 18, 32, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px 24px;
  transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* 与其他卡片一致的悬停突出效果 */
.mini-box:hover {
  transform: translateY(-6px);
  background: #ffffff;
  border-color: rgba(11, 18, 32, 0.14);
  box-shadow: 0 24px 48px -24px rgba(11, 18, 32, 0.25);
}

/* 小方框内图片:近方形,自适应盒内高度 */
.mini-box-img {
  width: auto;
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
}
.mini-box .card-title {
  font-size: 18px;
  margin-bottom: 0;
  text-align: center;
}
.mini-box .card-desc {
  text-align: center;
}

/* 图片卡:顶部展示产品图,保留卡片原有悬停强调效果 */
.card-img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 22px;
  background: #f2f5f9;
}

/* 竖版产品图:画布比例与图片一致(3:4),完整铺满不裁切 */
.card-img--fit {
  aspect-ratio: 3 / 4;
  object-fit: cover;
}

/* 方形宣传图:画布 1:1,与图片一致,完整铺满不裁切 */
.card-img--square {
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.card-icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  color: #2f6fb8;
  background: rgba(47, 111, 184, 0.08);
  border: 1px solid rgba(47, 111, 184, 0.2);
  margin-bottom: 24px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #0b1220;
  margin-bottom: 12px;
}
.card-desc {
  font-size: 14px;
  line-height: 1.9;
  color: rgba(11, 18, 32, 0.55);
}

.card-desc :deep(.hl-red) {
  color: #d81e06;
  font-weight: 700;
}
@media (max-width: 720px) {
  .cards {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .card {
    padding: 28px 24px;
  }
}
</style>
