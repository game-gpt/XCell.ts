import { docsModules } from "virtual:docs";

export interface DocNode {
    id: string;
    title: string;
    path: string;
    isDirectory: boolean;
    children?: DocNode[];
    parentId?: string;
    order?: number;
}

export interface DocMetadata {
    title?: string;
    order?: number;
}

function parseDocMetadata(content: string): DocMetadata {
    const metadata: DocMetadata = {};
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const titleMatch = frontmatter.match(/^title:\s*(.+)$/m);
        const orderMatch = frontmatter.match(/^order:\s*(\d+)$/m);

        if (titleMatch) {
            metadata.title = titleMatch[1].trim().replace(/^['"]|['"]$/g, "");
        }
        if (orderMatch) {
            metadata.order = parseInt(orderMatch[1], 10);
        }
    }

    return metadata;
}

function generateId(path: string): string {
    return path.replace(/\.md$/, "").replace(/\//g, "-");
}

function getDocTitle(path: string, metadata: DocMetadata): string {
    if (metadata.title) {
        return metadata.title;
    }

    const filename = path.split("/").pop()?.replace(".md", "") || "";

    const titleMap: Record<string, string> = {
        readme: "快速开始",
        dict: "dict 表",
        language: "language 表",
        list: "list 表",
        enum: "enum 表",
        class: "class 表",
        merge: "合表",
        "unity-integration": "Unity 集成",
        "type-system": "类型系统",
        "key-field": "字段约束",
        "ref-type": "引用类型",
        "meta-data": "元属性",
        config: "配置",
        extensibility: "可扩展性",
    };

    return titleMap[filename] || filename;
}

function shouldExclude(path: string): boolean {
    return path.includes("/maintainer/");
}

function buildDocTree(docs: DocNode[]): DocNode[] {
    const tree: DocNode[] = [];
    const nodeMap: Record<string, DocNode> = {};

    docs.forEach((doc) => {
        const isDirectory = doc.path.endsWith("/index.md");
        nodeMap[doc.id] = { ...doc, isDirectory, children: [] };
    });

    docs.forEach((doc) => {
        const node = nodeMap[doc.id];
        const pathParts = doc.path.split("/");

        if (pathParts.length <= 2) {
            if (!tree.some((n) => n.id === node.id)) {
                tree.push(node);
            }
        } else {
            const parentPathParts = pathParts.slice(0, -1);
            let currentParent: DocNode | undefined;

            for (let i = parentPathParts.length; i >= 2; i--) {
                const currentParentPathParts = parentPathParts.slice(0, i);
                const parentPath =
                    currentParentPathParts.join("/") + "/index.md";
                const parentId = generateId(parentPath);
                const parent = nodeMap[parentId];

                if (parent) {
                    currentParent = parent;
                    break;
                }
            }

            if (currentParent && currentParent.children) {
                if (!currentParent.children.some((n) => n.id === node.id)) {
                    currentParent.children.push(node);
                }
            } else if (!tree.some((n) => n.id === node.id)) {
                tree.push(node);
            }
        }
    });

    const sortNodes = (nodes: DocNode[]): DocNode[] => {
        return nodes
            .sort((a, b) => (a.order || 999) - (b.order || 999))
            .map((node) => ({
                ...node,
                children: node.children ? sortNodes(node.children) : undefined,
            }));
    };

    return sortNodes(tree);
}

export async function loadDocs(language: string): Promise<DocNode[]> {
    console.log("docsModules keys:", Object.keys(docsModules));
    const docs: DocNode[] = [];

    for (const path in docsModules) {
        if (shouldExclude(path)) {
            continue;
        }

        if (!path.startsWith(language + "/")) {
            continue;
        }

        const content = docsModules[path] as string;
        const metadata = parseDocMetadata(content);
        const relativePath = path.replace(language + "/", "");
        const id = generateId(relativePath);
        const title = getDocTitle(relativePath, metadata);

        docs.push({
            id,
            title,
            path: relativePath,
            isDirectory: false,
            order: metadata.order,
        });
    }

    console.log("Loaded docs:", docs);
    return buildDocTree(docs);
}

export async function getDocContent(
    path: string,
    language: string,
): Promise<string> {
    const fullPath = language + "/" + path;
    return (docsModules[fullPath] as string) || "";
}
