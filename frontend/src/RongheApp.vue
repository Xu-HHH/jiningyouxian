<script setup>
import Header from "./components/Header.vue"
import RongheView from "./components/RongheView.vue"
import Footer from "./components/Footer.vue"
import { ref } from "vue"

const menuOpen = ref(false)
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
</script>

<template>
  <div class="app">
    <Header :menu-open="menuOpen" @toggle="toggleMenu" />
    <main class="main">
      <RongheView />
    </main>
    <Footer />
  </div>
</template>
