<script setup>
import logoSd from '../assets/logo-sd.png'

defineProps({
  menuOpen: Boolean
})

const emit = defineEmits(['toggle'])

const links = [
  { label: '山东有线', href: '#home' },
  { label: '有线电视套餐', href: '#features' },
  { label: '5G', href: '#features' },
  { label: '融合套餐', href: '#features' },
  { label: '政策文件', href: '#features' },
  { label: '关于企业', href: '#features' }
]

// Smoothly scroll to the top of the home page when the home nav link is clicked
const onNavClick = (e, href) => {
  if (href === '#home') {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner">
      <a class="logo" href="#home" @click.stop="emit('toggle')">
        <img :src="logoSd" alt="山东有线 SHANDONG CABLE" class="logo-img" />
      </a>

      <nav class="nav-desktop" :class="{ hidden: menuOpen }">
        <a v-for="l in links" :key="l.label" :href="l.href" class="nav-link" @click="onNavClick($event, l.href)">
          {{ l.label }}
        </a>
      </nav>

      <div class="header-actions">
        <button class="icon-btn" type="button" aria-label="搜索">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.8-3.8" />
          </svg>
        </button>
        <button class="hamburger" type="button" :aria-label="menuOpen ? '关闭菜单' : '打开菜单'" @click="emit('toggle')">
          <span class="h-line" :class="{ open: menuOpen }"></span>
          <span class="h-line" :class="{ open: menuOpen }"></span>
          <span class="h-line" :class="{ open: menuOpen }"></span>
        </button>
      </div>
    </div>

    <transition name="fade">
      <div v-if="menuOpen" class="mobile-menu" @click="emit('toggle')">
        <a v-for="l in links" :key="l.label" :href="l.href" class="mobile-link" @click.stop="onNavClick($event, l.href); emit('toggle')">
          {{ l.label }}
        </a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.35) 60%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
}
.site-header > * {
  pointer-events: auto;
}

.header-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 40px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fff;
  transition: opacity 0.2s;
}
.logo-img {
  display: block;
  height: 60px;
  width: auto;
}
.nav-desktop {
  display: flex;
  align-items: center;
  gap: 40px;
  transition: opacity 0.2s;
}
.nav-desktop.hidden {
  opacity: 0;
  pointer-events: none;
}
.nav-link {
  position: relative;
  font-size: 17px;
  letter-spacing: 1.5px;
  color: rgba(255, 255, 255, 0.86);
  padding: 6px 0;
  transition: color 0.2s;
}
.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #fff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s ease;
}
.nav-link:hover {
  color: #fff;
}
.nav-link:hover::after {
  transform: scaleX(1);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}
.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: color 0.2s;
}
.icon-btn:hover {
  color: #fff;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  padding: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.h-line {
  display: block;
  width: 100%;
  height: 2px;
  background: #fff;
  border-radius: 1px;
  transition: transform 0.25s ease, opacity 0.2s;
}
.h-line.open:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.h-line.open:nth-child(2) {
  opacity: 0;
}
.h-line.open:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  inset: 72px 0 0;
  background: rgba(5, 5, 8, 0.96);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding: 64px 0;
}
.mobile-link {
  font-size: 22px;
  letter-spacing: 4px;
  color: rgba(255, 255, 255, 0.9);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .header-inner {
    padding: 0 20px;
  }
  .nav-desktop {
    display: none;
  }
  .hamburger {
    display: flex;
  }
  .icon-btn {
    display: none;
  }
}
</style>
