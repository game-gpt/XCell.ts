<template>
  <div>
    <div 
      :class="[
        'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all',
        currentPath === node.path 
          ? 'bg-primary-100 text-primary-800 border border-primary-200' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      ]"
      @click="handleSelect()"
      @dblclick="node.isDirectory && toggle()"
    >
      <span v-if="node.isDirectory" class="text-sm">
        {{ isExpanded ? '▼' : '▶' }}
      </span>
      <span class="flex-1">{{ node.title }}</span>
    </div>
    <div v-if="node.isDirectory && isExpanded && node.children" class="ml-4 mt-1">
      <DocTreeNode 
        v-for="child in node.children" 
        :key="child.id"
        :node="child"
        :current-path="currentPath"
        @select="$emit('select', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { DocNode } from "@/utils/docs";

interface Props {
	node: DocNode;
	currentPath: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
	select: [node: DocNode];
}>();

const isExpanded = ref(true);

function toggle() {
	isExpanded.value = !isExpanded.value;
}

function handleSelect() {
	emit("select", props.node);
}
</script>
