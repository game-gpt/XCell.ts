<template>
  <HomeLayout>
    <section class="pt-40 pb-32">
      <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <div class="text-9xl font-bold text-primary-500 mb-8">404</div>
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 mb-6">页面未找到</h1>
        <p class="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <router-link 
            to="/" 
            class="group relative overflow-hidden px-10 py-5 rounded-2xl text-lg font-bold bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <span class="relative z-10 flex items-center gap-3">
              返回首页
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </router-link>
          <router-link 
            to="/document" 
            class="group px-10 py-5 rounded-2xl text-lg font-bold bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            <span class="flex items-center gap-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
              查看文档
            </span>
          </router-link>
        </div>
      </div>
    </section>
  </HomeLayout>
</template>

<script setup lang="ts">
import HomeLayout from "../components/HomeLayout.vue";
</script>

<style scoped>
/* 额外的样式可以在这里添加 */
</style>