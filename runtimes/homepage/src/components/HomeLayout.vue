<template>
  <div class="min-h-screen bg-white text-slate-900 relative overflow-hidden flex flex-col">
    <div class="fixed inset-0 z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-blue-500/15 rounded-full blur-[100px] animate-pulse" style="animation-delay: 1s;"></div>
      <div class="absolute bottom-[-10%] left-[30%] w-[550px] h-[550px] bg-primary-300/10 rounded-full blur-[110px] animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <Header />

    <main class="relative z-10 flex-1 min-h-[80vh] pt-24 p-4">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
</script>