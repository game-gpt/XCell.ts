<template>
  <div class="flex flex-col lg:flex-row min-h-[calc(100vh-120px)]">
    <aside class="lg:w-80 flex-shrink-0 border-r border-slate-200 bg-slate-50">
      <div class="sticky top-20 p-6 h-[calc(100vh-5rem)] overflow-y-auto">
        <h2 class="text-xl font-bold text-slate-800 mb-6">文档导航</h2>
        <nav v-if="docTree.length > 0">
          <div v-for="node in docTree" :key="node.id" class="mb-1">
            <DocTreeNode :node="node" :current-path="currentDocPath" @select="selectDoc" />
          </div>
        </nav>
        <div v-else class="text-slate-600 text-sm">
          加载文档中...
        </div>
      </div>
    </aside>

    <main class="flex-1">
      <div class="p-8 lg:p-12 min-h-[calc(100vh-120px)]">
        <div v-if="currentDoc">
          <h2 class="text-3xl font-bold mb-6 text-slate-800">{{ currentDoc.title }}</h2>
          <div class="prose prose-slate max-w-none">
            <MarkdownViewer :content="currentDocContent" />
          </div>
        </div>
        <div v-else-if="errorMessage" class="text-red-600 p-4 bg-red-50 rounded-lg">
          <h3 class="text-xl font-bold mb-2">错误信息</h3>
          <pre>{{ errorMessage }}</pre>
        </div>
        <div v-else class="text-slate-600 text-center py-16">
          <p class="text-lg">请从左侧选择文档查看</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { loadDocs, getDocContent, type DocNode } from "@/utils/docs";
import MarkdownViewer from "@/components/MarkdownViewer.vue";
import DocTreeNode from "@/components/DocTreeNode.vue";

const router = useRouter();
const route = useRoute();
const docTree = ref<DocNode[]>([]);
const currentDocPath = ref<string>("");
const currentDoc = ref<DocNode | null>(null);
const currentDocContent = ref<string>("");
const currentLanguage = ref<string>(
	localStorage.getItem("language") || "zh-hans",
);
const errorMessage = ref<string>("");
const allDocs = ref<Map<string, DocNode>>(new Map());

function buildDocMap(docs: DocNode[], map: Map<string, DocNode>) {
	for (const doc of docs) {
		map.set(doc.path, doc);
		if (doc.children) {
			buildDocMap(doc.children, map);
		}
	}
}

async function loadDocByPath(path: string) {
	const doc = allDocs.value.get(path);
	if (doc) {
		await selectDoc(doc, false);
	} else {
		currentDoc.value = null;
		currentDocContent.value = "";
		errorMessage.value = `找不到文档: ${path}`;
	}
}

async function init() {
	try {
		console.log("Initializing docs...");
		console.log("Current language:", currentLanguage.value);

		docTree.value = await loadDocs(currentLanguage.value);
		allDocs.value.clear();
		buildDocMap(docTree.value, allDocs.value);

		console.log("Loaded docTree:", docTree.value);
		console.log("All docs map size:", allDocs.value.size);

		const urlPath = route.params.pathMatch as string | string[] | undefined;
		const docPath = Array.isArray(urlPath) ? urlPath.join("/") : (urlPath || "");

		if (docPath) {
			await loadDocByPath(docPath);
		} else if (docTree.value.length > 0) {
			const firstDoc = findFirstDoc(docTree.value[0]);
			if (firstDoc) {
				await selectDoc(firstDoc, true);
			}
		}
	} catch (error) {
		console.error("Error initializing docs:", error);
		errorMessage.value = `Error: ${error instanceof Error ? error.message : String(error)}`;
	}
}

function findFirstDoc(node: DocNode): DocNode | null {
	if (!node.isDirectory && !node.children?.length) {
		return node;
	}
	if (node.children && node.children.length > 0) {
		return findFirstDoc(node.children[0]);
	}
	return null;
}

async function selectDoc(node: DocNode, updateRoute: boolean = true) {
	console.log("=== selectDoc called ===");
	console.log(`Node:`, node);
	currentDocPath.value = node.path;
	currentDoc.value = node;
	errorMessage.value = "";

	currentDocContent.value = await getDocContent(
		node.path,
		currentLanguage.value,
	);
	console.log(`Got content length: ${currentDocContent.value.length}`);

	if (updateRoute) {
		router.push(`/document/${node.path}`);
	}
}

function checkLanguageChange() {
	const storedLanguage = localStorage.getItem("language") || "zh-hans";
	if (storedLanguage !== currentLanguage.value) {
		currentLanguage.value = storedLanguage;
		init();
	}
}

const languageCheckInterval = setInterval(checkLanguageChange, 1000);

watch(
	() => route.params.pathMatch,
	async (newPath) => {
		const docPath = Array.isArray(newPath) ? newPath.join("/") : (newPath || "");
		if (docPath && docPath !== currentDocPath.value) {
			await loadDocByPath(docPath);
		}
	},
);

onMounted(() => {
	init();
});

onUnmounted(() => {
	clearInterval(languageCheckInterval);
});
</script>
