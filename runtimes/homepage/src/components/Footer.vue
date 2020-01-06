<template>
  <footer class="relative z-10 border-t border-slate-200 bg-white">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-16">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        <div class="col-span-2 md:col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
              <span class="text-white font-bold text-xl">X</span>
            </div>
            <span class="text-2xl font-bold text-slate-800">XCell</span>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">
            专业游戏配置导表工具，让游戏开发更高效、更准确。
          </p>
        </div>
        
        <div>
          <h4 class="text-slate-800 font-semibold mb-4">产品</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">功能特性</a></li>
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">下载</a></li>
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">更新日志</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-slate-800 font-semibold mb-4">资源</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">文档</a></li>
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">教程</a></li>
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">API</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-slate-800 font-semibold mb-4">社区</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">GitHub</a></li>
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">Discord</a></li>
            <li><a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">Twitter</a></li>
          </ul>
        </div>
      </div>
      
      <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-slate-600 text-sm">
          © 2026 XCell. All rights reserved.
        </p>
        <div class="flex items-center gap-6">
          <a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">隐私政策</a>
          <a href="#" class="text-slate-600 hover:text-slate-800 transition-colors text-sm">服务条款</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component
</script>