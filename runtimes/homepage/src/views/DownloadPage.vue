<template>
  <section class="pt-40 pb-32">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="text-center mb-24">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">下载 XCell</h1>
        <p class="text-xl text-slate-700 max-w-2xl mx-auto mb-8">选择适合您操作系统的版本，开始使用简单、灵活的游戏配置导表工具</p>
        <div class="inline-flex items-center gap-3 px-6 py-3 bg-slate-100 rounded-full text-slate-600">
          <span class="text-sm font-medium">当前版本：v1.0.0</span>
          <a href="#" class="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">查看更新日志</a>
        </div>
      </div>
      
      <!-- 下载选项 -->
      <div class="space-y-6 max-w-4xl mx-auto">
        <!-- Windows 版本 -->
        <div 
          class="group w-full flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-primary-200"
        >
          <div class="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform flex-shrink-0">
            <span class="text-5xl">🪟</span>
          </div>
          <div class="flex-1 text-left">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-2xl font-bold text-slate-900">Windows</h3>
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">推荐</span>
            </div>
            <p class="text-slate-700 mb-4">Windows 10/11 (64位)</p>
            <div class="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>• 系统要求：Windows 10 或更高版本</span>
              <span>• 大小：约 20MB</span>
              <span>• 安装方式：可执行文件</span>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <button class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all group-hover:scale-105">
              立即下载
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- macOS 版本 -->
        <div 
          class="group w-full flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-primary-200"
        >
          <div class="w-20 h-20 bg-gradient-to-br from-slate-500/20 to-slate-600/20 rounded-2xl flex items-center justify-center border border-slate-500/30 group-hover:scale-110 transition-transform flex-shrink-0">
            <span class="text-5xl">🍎</span>
          </div>
          <div class="flex-1 text-left">
            <h3 class="text-2xl font-bold text-slate-900 mb-2">macOS</h3>
            <p class="text-slate-700 mb-4">macOS 11+ (Big Sur 或更高版本)</p>
            <div class="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>• 系统要求：macOS 11 或更高版本</span>
              <span>• 大小：约 25MB</span>
              <span>• 安装方式：DMG 镜像</span>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <button class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl font-bold text-white group-hover:shadow-lg group-hover:shadow-slate-500/30 transition-all group-hover:scale-105">
              立即下载
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Linux 版本 -->
        <div 
          class="group w-full flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-primary-200"
        >
          <div class="w-20 h-20 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center border border-primary-500/30 group-hover:scale-110 transition-transform flex-shrink-0">
            <span class="text-5xl">🐧</span>
          </div>
          <div class="flex-1 text-left">
            <h3 class="text-2xl font-bold text-slate-900 mb-2">Linux</h3>
            <p class="text-slate-700 mb-4">Ubuntu 20.04+, Fedora 34+, 其他主流发行版</p>
            <div class="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>• 系统要求：64位 Linux 发行版</span>
              <span>• 大小：约 18MB</span>
              <span>• 安装方式：AppImage / 源码</span>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <button class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl font-bold text-white group-hover:shadow-lg group-hover:shadow-primary-500/30 transition-all group-hover:scale-105">
              立即下载
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 包管理器安装 -->
        <div 
          class="group w-full flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-primary-200"
        >
          <div class="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30 group-hover:scale-110 transition-transform flex-shrink-0">
            <span class="text-5xl">📦</span>
          </div>
          <div class="flex-1 text-left">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">包管理器安装</h3>
            <p class="text-slate-700 mb-6">通过包管理器快速安装 XCell，支持 CI/CD 集成</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 class="text-sm font-medium text-slate-600 mb-3">npm</h4>
                <code class="text-sm bg-white px-3 py-1.5 rounded border border-slate-200 w-full block">npm install -g xcell</code>
              </div>
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 class="text-sm font-medium text-slate-600 mb-3">pnpm</h4>
                <code class="text-sm bg-white px-3 py-1.5 rounded border border-slate-200 w-full block">pnpm add -g xcell</code>
              </div>
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 class="text-sm font-medium text-slate-600 mb-3">cargo</h4>
                <code class="text-sm bg-white px-3 py-1.5 rounded border border-slate-200 w-full block">cargo install xcell</code>
              </div>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <button class="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl font-bold text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all group-hover:scale-105">
              查看文档
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- 源码获取 -->
        <div 
          class="group w-full flex flex-col md:flex-row items-start md:items-center gap-6 p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-primary-200"
        >
          <div class="w-20 h-20 bg-gradient-to-br from-slate-800/20 to-slate-900/20 rounded-2xl flex items-center justify-center border border-slate-800/30 group-hover:scale-110 transition-transform flex-shrink-0">
            <span class="text-5xl">💻</span>
          </div>
          <div class="flex-1 text-left">
            <h3 class="text-2xl font-bold text-slate-900 mb-4">源码获取</h3>
            <p class="text-slate-700 mb-6">从 GitHub 仓库获取源码，适合二次开发和自定义构建</p>
            
            <div class="space-y-4">
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 class="text-sm font-medium text-slate-600 mb-3">GitHub 仓库</h4>
                <div class="flex items-center gap-2">
                  <span class="text-sm font-medium text-slate-600">仓库地址:</span>
                  <a href="#" class="text-sm text-primary-600 hover:text-primary-700 transition-colors flex-1 truncate">github.com/xcell-project/xcell</a>
                </div>
              </div>
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h4 class="text-sm font-medium text-slate-600 mb-3">克隆仓库</h4>
                <code class="text-sm bg-white px-3 py-1.5 rounded border border-slate-200 w-full block">git clone https://github.com/xcell-project/xcell.git</code>
              </div>
            </div>
          </div>
          <div class="text-right flex-shrink-0">
            <button class="inline-flex items-center gap-2 px-8 py-3 bg-slate-800 rounded-xl font-bold text-white hover:bg-slate-700 transition-all group-hover:shadow-lg group-hover:shadow-slate-500/30 group-hover:scale-105">
              查看源码
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- 下载说明 -->
      <div class="mt-24 max-w-3xl mx-auto">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">下载说明</h2>
        <div class="space-y-4 text-slate-700">
          <p>• 所有版本均包含完整功能，选择适合您操作系统的版本即可。</p>
          <p>• Windows 和 macOS 版本提供图形界面，Linux 版本提供命令行工具。</p>
          <p>• 如需自定义构建或贡献代码，请使用源码版本。</p>
          <p>• 如有下载问题，请访问 <a href="#" class="text-primary-600 hover:text-primary-700 transition-colors">帮助中心</a> 或联系我们的支持团队。</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>