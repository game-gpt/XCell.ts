<template>
  <div class="min-h-screen bg-white">
    <Header />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>

<style scoped>
main {
  min-height: calc(100vh - 120px);
  height: 100%;
}
</style>