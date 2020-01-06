<template>
  <header class="fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <span class="text-white font-bold text-xl">X</span>
          </div>
          <span class="text-2xl font-bold text-slate-800">XCell</span>
        </div>
        
        <nav class="hidden md:flex items-center gap-1">
          <router-link 
            to="/"
            :class="[
              'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
              route.path === '/' 
                ? 'bg-primary-100 text-primary-800 border border-primary-200' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            ]"
          >
            {{ getLocalizedText('home') }}
          </router-link>
          <router-link 
            to="/download"
            :class="[
              'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
              route.path === '/download' 
                ? 'bg-primary-100 text-primary-800 border border-primary-200' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            ]"
          >
            {{ getLocalizedText('download') }}
          </router-link>
          <router-link 
            to="/document"
            :class="[
              'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
              route.path === '/document' 
                ? 'bg-primary-100 text-primary-800 border border-primary-200' 
                : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
            ]"
          >
            {{ getLocalizedText('document') }}
          </router-link>
        </nav>

        <div class="flex items-center gap-4">
            <div class="relative">
              <button class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-all duration-300" @click="toggleLanguageMenu">
                {{ currentLanguageName }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div v-if="showLanguageMenu" class="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                <button 
                  v-for="lang in languages" 
                  :key="lang.code"
                  @click="switchLanguage(lang.code)"
                  class="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                >
                  {{ lang.name }}
                </button>
              </div>
            </div>
          </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showLanguageMenu = ref(false);
const currentLanguage = ref(localStorage.getItem("language") || "zh-hans");

const languages = [
	{ code: "zh-hans", name: "简体中文" },
	{ code: "en", name: "English" },
];

const currentLanguageName = computed(() => {
	const lang = languages.find((l) => l.code === currentLanguage.value);
	return lang ? lang.name : "简体中文";
});

interface TranslationKeys {
	home: string;
	download: string;
	document: string;
	[key: string]: string;
}

interface Translations {
	"zh-hans": TranslationKeys;
	en: TranslationKeys;
	[key: string]: TranslationKeys;
}

const translations: Translations = {
	"zh-hans": {
		home: "首页",
		download: "下载",
		document: "文档",
	},
	en: {
		home: "Home",
		download: "Download",
		document: "Document",
	},
};

function getLocalizedText(key: string): string {
	return (
		translations[currentLanguage.value]?.[key] ||
		translations["zh-hans"][key] ||
		key
	);
}

function toggleLanguageMenu() {
	showLanguageMenu.value = !showLanguageMenu.value;
}

function switchLanguage(code: string) {
	currentLanguage.value = code;
	localStorage.setItem("language", code);
	showLanguageMenu.value = false;
	// 重新加载当前页面以应用语言变化
	window.location.reload();
}

function handleClickOutside(event: MouseEvent) {
	const target = event.target as HTMLElement;
	if (!target.closest(".relative")) {
		showLanguageMenu.value = false;
	}
}

onMounted(() => {
	document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
	document.removeEventListener("click", handleClickOutside);
});
</script>