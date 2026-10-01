<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Recommend from './components/Recommend.vue'
import Features from './components/Features.vue'
import Footer from './components/Footer.vue'
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <div class="app">
    <Header :menu-open="menuOpen" @toggle="toggleMenu" />
    <main class="main">
      <Hero />
      <Recommend />
      <Features />
    </main>
    <Footer />
  </div>
</template>
