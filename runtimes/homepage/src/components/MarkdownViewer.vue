<template>
  <div class="markdown-viewer prose prose-slate max-w-none">
    <div v-html="renderedContent" ref="contentRef"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { marked } from "marked";
import * as shiki from "shiki";

interface Props {
    content: string;
}

const props = defineProps<Props>();
const contentRef = ref<HTMLElement | null>(null);

const renderer = new marked.Renderer();

let codeBlockId = 0;

renderer.code = function (data: {
    text: string;
    lang?: string;
    escaped?: boolean;
}) {
    const { text, lang } = data;
    if (!lang) {
        return `<pre><code>${text}</code></pre>`;
    }

    const parts = lang.split(":");
    const language = parts[0];
    const platform = parts[1] || "default";

    const id = `code-block-${codeBlockId++}`;

    const codeString = typeof text === "string" ? text : String(text);

    if (platform !== "default") {
        return `
      <div class="code-platform-container" data-code-block-id="${id}">
        <div class="code-platform-switcher mb-4">
          <div class="flex flex-wrap gap-2">
            <button 
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-white/10 text-white border border-white/10 active"
              data-platform="unity"
              data-code-block-id="${id}"
            >
              Unity
            </button>
            <button 
              class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
              data-platform="cocos"
              data-code-block-id="${id}"
            >
              Cocos
            </button>
          </div>
        </div>
        <pre><code class="language-${language}" data-code="${codeString}" data-language="${language}" data-code-block-id="${id}">${codeString}</code></pre>
      </div>
    `;
    }

    return `<pre><code class="language-${language}" data-code="${codeString}" data-language="${language}">${codeString}</code></pre>`;
};

// 为每个表格初始化行索引
let tableRowIndex = 0;

renderer.table = function (token: any) {
    // 为每个表格重置行索引
    tableRowIndex = 0;

    const header = token.header
        .map((cell: any) => this.tablecell(cell))
        .join("");
    const rows = token.rows
        .map((row: any) =>
            this.tablerow({
                text: row.map((cell: any) => this.tablecell(cell)).join(""),
            }),
        )
        .join("");

    return `
    <table class="w-full border-collapse mb-4">
      <thead>
        <tr>${header}</tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};

renderer.tablerow = function (token: any) {
    const content = token.text;

    // 检查是否是表格的第二行或第三行（xcell 约定的特殊行）
    if (tableRowIndex === 0 || tableRowIndex === 1) {
        // 第二行（字段别名）和第三行（字段类型）
        tableRowIndex++;
        return `<tr class="bg-gray-50">${content}</tr>`;
    }

    tableRowIndex++;
    return `<tr>${content}</tr>`;
};

renderer.tablecell = function (token: any) {
    const content = token.text;
    if (token.header) {
        return `<th class="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-gray-800">${content}</th>`;
    }

    return `<td class="border border-gray-300 px-4 py-2">${content}</td>`;
};

renderer.link = function (data: {
    href: string;
    title?: string | null;
    text: string;
}) {
    const { href, title, text } = data;
    let processedHref = href;
    if (href && !href.startsWith("http://") && !href.startsWith("https://")) {
        processedHref = `/document${href}`;
    }

    const titleAttr = title ? ` title="${title}"` : "";
    return `<a href="${processedHref}"${titleAttr} class="text-primary-600 hover:text-primary-700 underline">${text}</a>`;
};

marked.use({
    renderer,
});

const renderedContent = computed(() => {
    const contentString =
        typeof props.content === "string"
            ? props.content
            : String(props.content);
    const content = contentString.replace(/^---\n[\s\S]*?\n---/, "");
    return marked.parse(content).toString();
});

function setupPlatformSwitching() {
    if (!contentRef.value) return;

    const switchButtons = contentRef.value.querySelectorAll(
        ".code-platform-switcher button",
    );
    switchButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const target = e.currentTarget as HTMLElement;
            const platform = target.dataset.platform;
            const codeBlockId = target.dataset.codeBlockId;

            if (platform && codeBlockId) {
                const container = contentRef.value?.querySelector(
                    `[data-code-block-id="${codeBlockId}"]`,
                );
                if (container) {
                    const buttons = container.querySelectorAll(
                        ".code-platform-switcher button",
                    );
                    buttons.forEach((btn) => {
                        btn.classList.remove(
                            "active",
                            "bg-white/10",
                            "text-white",
                            "border",
                            "border-white/10",
                        );
                        btn.classList.add(
                            "text-slate-400",
                            "hover:text-white",
                            "hover:bg-white/5",
                            "border-transparent",
                        );
                    });

                    target.classList.add(
                        "active",
                        "bg-white/10",
                        "text-white",
                        "border",
                        "border-white/10",
                    );
                    target.classList.remove(
                        "text-slate-400",
                        "hover:text-white",
                        "hover:bg-white/5",
                        "border-transparent",
                    );

                    console.log(
                        `Switching to ${platform} for code block ${codeBlockId}`,
                    );
                }
            }
        });
    });
}

async function setupCodeHighlighting() {
    if (!contentRef.value) return;

    try {
        const codeBlocks = contentRef.value.querySelectorAll("pre code");
        for (const codeElement of codeBlocks) {
            const htmlElement = codeElement as HTMLElement;
            const code =
                htmlElement.dataset.code || htmlElement.textContent || "";
            const language =
                htmlElement.dataset.language ||
                htmlElement.className.replace("language-", "") ||
                "text";

            try {
                const highlightedCode = await shiki.codeToHtml(code, {
                    lang: language,
                    theme: "github-dark",
                });
                const preElement = htmlElement.parentElement;
                if (preElement) {
                    preElement.innerHTML = highlightedCode;
                }
            } catch (error) {
                console.error("Error highlighting code:", error);
            }
        }
    } catch (error) {
        console.error("Error setting up code highlighting:", error);
    }
}

onMounted(async () => {
    setupPlatformSwitching();
    await setupCodeHighlighting();
});
</script>

<style scoped>
.markdown-viewer {
  @apply text-gray-700;
}

.markdown-viewer :deep(h1) {
  @apply text-3xl font-bold mb-6 mt-8 text-gray-900;
}

.markdown-viewer :deep(h2) {
  @apply text-2xl font-semibold mb-4 mt-6 text-gray-900 border-b-2 border-primary-500/20 pb-2;
}

.markdown-viewer :deep(h3) {
  @apply text-xl font-semibold mb-3 mt-5 text-gray-900;
}

.markdown-viewer :deep(p) {
  @apply mb-4 leading-relaxed;
}

.markdown-viewer :deep(ul),
.markdown-viewer :deep(ol) {
  @apply mb-4 pl-6;
}

.markdown-viewer :deep(li) {
  @apply mb-2;
}

.markdown-viewer :deep(code) {
  @apply bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-primary-600;
}

.markdown-viewer :deep(pre) {
  @apply bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto;
}

.markdown-viewer :deep(pre code) {
  @apply bg-transparent px-0 py-0 text-gray-100;
}

.markdown-viewer :deep(a) {
  @apply text-primary-600 hover:text-primary-700 underline;
}

.markdown-viewer :deep(blockquote) {
  @apply border-l-4 border-primary-500 pl-4 italic text-gray-600 mb-4 bg-primary-500/5 py-2;
}



.markdown-viewer :deep(.code-platform-container) {
  @apply mb-6;
}

.markdown-viewer :deep(.code-platform-switcher) {
  @apply mb-4;
}

.markdown-viewer :deep(.code-platform-switcher button) {
  @apply px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300;
}

.markdown-viewer :deep(.code-platform-switcher button:hover) {
  @apply text-white hover:bg-white/5;
}

.markdown-viewer :deep(.code-platform-switcher button.active) {
  @apply bg-white/10 text-white border border-white/10;
}
</style>
