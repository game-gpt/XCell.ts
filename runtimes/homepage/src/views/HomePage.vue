<template>
  <section class="pt-32 pb-32">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="text-center max-w-4xl mx-auto mb-24">
          
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
          <span class="bg-gradient-to-r from-slate-800 via-primary-700 to-primary-600 bg-clip-text text-transparent">简单配置</span>
          <br>
          <span class="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 bg-clip-text text-transparent">灵活导出</span>
        </h1>
        
        <p class="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          XCell 为游戏开发者提供简单易用的配置导表功能，让您的团队更简单、更灵活地管理游戏配置数据
        </p>
        
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              @click="router.push('/download')"
              class="group relative overflow-hidden px-10 py-5 rounded-2xl text-lg font-bold bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <span class="relative z-10 flex items-center gap-3">
                立即下载
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
              <div class="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button 
              @click="router.push('/document')"
              class="group px-10 py-5 rounded-2xl text-lg font-bold bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-800 hover:bg-white hover:border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              <span class="flex items-center gap-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                查看文档
              </span>
            </button>
          </div>
      </div>

      <div class="space-y-24">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="order-2 md:order-1">
            <div class="text-emerald-600 text-sm font-semibold mb-4 flex items-center gap-2">
              <span class="w-1 h-6 bg-emerald-600 rounded-full"></span>
              📊 简单易用
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6">直观的配置管理</h3>
            <p class="text-lg text-slate-600 leading-relaxed mb-8">简单易用的界面，让配置管理变得轻松愉快，无需复杂的技术知识，上手即用。</p>
            <button class="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
              了解更多
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
          <div class="order-1 md:order-2 relative">
            <div class="aspect-video bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl border border-slate-200 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div class="text-8xl animate-bounce">📊</div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="relative">
            <div class="aspect-video bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl border border-slate-200 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div class="text-8xl animate-spin-slow">🔧</div>
            </div>
          </div>
          <div>
            <div class="text-teal-600 text-sm font-semibold mb-4 flex items-center gap-2">
              <span class="w-1 h-6 bg-teal-600 rounded-full"></span>
              🔧 灵活配置
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6">自定义导出规则</h3>
            <p class="text-lg text-slate-600 leading-relaxed mb-8">支持自定义导出规则和模板，满足不同项目的特殊需求，让配置导出更加灵活。</p>
            <button class="flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors">
              了解更多
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="order-2 md:order-1">
            <div class="text-blue-600 text-sm font-semibold mb-4 flex items-center gap-2">
              <span class="w-1 h-6 bg-blue-600 rounded-full"></span>
              🚀 CI/CD 友好
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6">自动化集成</h3>
            <p class="text-lg text-slate-600 leading-relaxed mb-8">支持 CI/CD 集成，可通过 npm 编译流实现自动化配置导出，提高开发效率，减少人工操作。</p>
            <button class="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              了解更多
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
          <div class="order-1 md:order-2 relative">
            <div class="aspect-video bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-3xl border border-slate-200 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div class="text-8xl animate-bounce">🚀</div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div class="relative">
            <div class="aspect-video bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-3xl border border-slate-200 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div class="text-8xl animate-pulse">⚡</div>
            </div>
          </div>
          <div>
            <div class="text-indigo-600 text-sm font-semibold mb-4 flex items-center gap-2">
              <span class="w-1 h-6 bg-indigo-600 rounded-full"></span>
              ⚡ 高性能
            </div>
            <h3 class="text-3xl md:text-4xl font-bold text-slate-800 mb-6">基于 Rust 构建，急速解析</h3>
            <p class="text-lg text-slate-600 leading-relaxed mb-8">采用 Rust 语言开发，处理大量配置数据时依然保持高性能，为您提供流畅的使用体验。</p>
            <button class="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
              了解更多
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>