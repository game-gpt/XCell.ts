<template>
  <div class="code-platform-switcher mb-4">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="platform in platforms"
        :key="platform.value"
        @click="selectPlatform(platform.value)"
        :class="[
          'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
          selectedPlatform === platform.value
            ? 'bg-white/10 text-white border border-white/10'
            : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
        ]"
      >
        {{ platform.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Platform {
	label: string;
	value: string;
}

interface Props {
	platforms: Platform[];
	modelValue: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
}>();

const selectedPlatform = props.modelValue;

function selectPlatform(platform: string) {
	emit("update:modelValue", platform);
}
</script>

<style scoped>
.code-platform-switcher {
  @apply mb-4;
}
</style>