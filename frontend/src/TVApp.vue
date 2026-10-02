<script setup>
import Header from './components/Header.vue'
import TVView from './components/TVView.vue'
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
      <TVView />
    </main>
    <Footer />
  </div>
</template>
