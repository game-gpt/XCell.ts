import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const DEFAULT_SOURCE = 'zh-hans';
const DEFAULT_TARGETS = ['en', 'ja', 'zh-hant'];
const DOC_ROOT = 'documentation';

function parseArgs() {
    const args = process.argv.slice(2);
    const result = {
        source: DEFAULT_SOURCE,
        targets: [...DEFAULT_TARGETS],
        help: false
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--source') {
            result.source = args[++i];
        } else if (arg === '--targets') {
            result.targets = args[++i].split(',').map(t => t.trim());
        } else if (arg === '--help' || arg === '-h') {
            result.help = true;
        }
    }

    return result;
}

function printHelp() {
    console.log(`
文档检查工具
============

用法: node check-document.mjs [选项]

选项:
  --source <lang>    源语言目录名 (默认: ${DEFAULT_SOURCE})
  --targets <langs>  目标语言列表，逗号分隔 (默认: ${DEFAULT_TARGETS.join(',')})
  --help, -h         显示帮助信息

示例:
  node check-document.mjs
  node check-document.mjs --source zh-hans --targets en,ja,ko
`);
}

async function scanDirectory(dir, baseDir = dir) {
    const files = [];
    
    async function scan(currentDir) {
        const entries = await readdir(currentDir, { withFileTypes: true });
        
        for (const entry of entries) {
            const fullPath = join(currentDir, entry.name);
            
            if (entry.isDirectory()) {
                await scan(fullPath);
            } else if (entry.isFile() && entry.name.endsWith('.md')) {
                files.push({
                    absolutePath: fullPath,
                    relativePath: relative(baseDir, fullPath)
                });
            }
        }
    }
    
    await scan(dir);
    return files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));
}

function parseMarkdownHeaders(content) {
    const headers = [];
    const lines = content.split(/\r?\n/);
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        if (line.startsWith('```')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }

        if (inCodeBlock) {
            continue;
        }

        const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            headers.push({
                level: headerMatch[1].length,
                text: headerMatch[2].trim(),
                line: i + 1
            });
        }
    }

    return headers;
}

function compareHeaders(sourceHeaders, targetHeaders) {
    const differences = [];

    const sourceByLevel = {};
    const targetByLevel = {};

    for (const h of sourceHeaders) {
        if (!sourceByLevel[h.level]) sourceByLevel[h.level] = [];
        sourceByLevel[h.level].push(h);
    }

    for (const h of targetHeaders) {
        if (!targetByLevel[h.level]) targetByLevel[h.level] = [];
        targetByLevel[h.level].push(h);
    }

    const allLevels = new Set([
        ...Object.keys(sourceByLevel).map(Number),
        ...Object.keys(targetByLevel).map(Number)
    ]);

    for (const level of allLevels) {
        const sourceCount = sourceByLevel[level]?.length || 0;
        const targetCount = targetByLevel[level]?.length || 0;

        if (sourceCount !== targetCount) {
            const firstDiff = findFirstDifference(
                sourceByLevel[level] || [],
                targetByLevel[level] || []
            );

            differences.push({
                level,
                sourceCount,
                targetCount,
                line: firstDiff?.line || null
            });
        }
    }

    return differences;
}

function findFirstDifference(sourceHeaders, targetHeaders) {
    const maxLen = Math.max(sourceHeaders.length, targetHeaders.length);
    
    for (let i = 0; i < maxLen; i++) {
        const source = sourceHeaders[i];
        const target = targetHeaders[i];

        if (!source || !target) {
            return source || target;
        }

        if (source.text !== target.text) {
            return target;
        }
    }

    return null;
}

async function checkDocuments(sourceDir, targetDirs, docRoot) {
    const report = {
        sourceFiles: [],
        targetResults: {},
        errors: []
    };

    const sourcePath = join(docRoot, sourceDir);
    
    try {
        report.sourceFiles = await scanDirectory(sourcePath);
    } catch (error) {
        report.errors.push({
            type: 'source_not_found',
            message: `源语言目录不存在: ${sourcePath}`
        });
        return report;
    }

    for (const targetDir of targetDirs) {
        const targetPath = join(docRoot, targetDir);
        const targetResult = {
            files: [],
            missingFiles: [],
            extraFiles: [],
            headerIssues: [],
            passed: true
        };

        try {
            targetResult.files = await scanDirectory(targetPath);
        } catch (error) {
            targetResult.passed = false;
            targetResult.missingFiles = report.sourceFiles.map(f => f.relativePath);
            report.targetResults[targetDir] = targetResult;
            continue;
        }

        const sourceRelativePaths = new Set(
            report.sourceFiles.map(f => f.relativePath)
        );
        const targetRelativePaths = new Set(
            targetResult.files.map(f => f.relativePath)
        );

        for (const file of report.sourceFiles) {
            if (!targetRelativePaths.has(file.relativePath)) {
                targetResult.missingFiles.push(file.relativePath);
            }
        }

        for (const file of targetResult.files) {
            if (!sourceRelativePaths.has(file.relativePath)) {
                targetResult.extraFiles.push(file.relativePath);
            }
        }

        for (const sourceFile of report.sourceFiles) {
            const targetFile = targetResult.files.find(
                f => f.relativePath === sourceFile.relativePath
            );

            if (!targetFile) continue;

            try {
                const [sourceContent, targetContent] = await Promise.all([
                    readFile(sourceFile.absolutePath, 'utf-8'),
                    readFile(targetFile.absolutePath, 'utf-8')
                ]);

                const sourceHeaders = parseMarkdownHeaders(sourceContent);
                const targetHeaders = parseMarkdownHeaders(targetContent);
                const differences = compareHeaders(sourceHeaders, targetHeaders);

                if (differences.length > 0) {
                    targetResult.passed = false;
                    targetResult.headerIssues.push({
                        file: sourceFile.relativePath,
                        differences
                    });
                }
            } catch (error) {
                targetResult.passed = false;
                targetResult.headerIssues.push({
                    file: sourceFile.relativePath,
                    error: error.message
                });
            }
        }

        if (targetResult.missingFiles.length > 0 || 
            targetResult.extraFiles.length > 0) {
            targetResult.passed = false;
        }

        report.targetResults[targetDir] = targetResult;
    }

    return report;
}

function printReport(report, sourceLang) {
    console.log('文档检查报告');
    console.log('============\n');

    const sourceCount = report.sourceFiles.length;
    let hasErrors = false;

    for (const [targetLang, result] of Object.entries(report.targetResults)) {
        if (!result.passed) {
            hasErrors = true;
            break;
        }
    }

    if (!hasErrors) {
        for (const [targetLang, result] of Object.entries(report.targetResults)) {
            console.log(`✓ ${targetLang}: 检查通过 (${result.files.length} 个文件)`);
        }
        console.log('\n总计: 所有语言检查通过');
        return;
    }

    for (const [targetLang, result] of Object.entries(report.targetResults)) {
        if (result.passed) {
            console.log(`✓ ${targetLang}: 检查通过 (${result.files.length} 个文件)\n`);
            continue;
        }

        if (result.missingFiles.length > 0 || result.extraFiles.length > 0) {
            console.log(`✗ 文件数量不一致 (${targetLang})`);
            console.log(`  - ${sourceLang}: ${sourceCount} 个文件`);
            console.log(`  - ${targetLang}: ${result.files.length} 个文件`);
            
            if (result.missingFiles.length > 0) {
                console.log(`  - 缺失: ${result.missingFiles.join(', ')}`);
            }
            if (result.extraFiles.length > 0) {
                console.log(`  - 多余: ${result.extraFiles.join(', ')}`);
            }
            console.log('');
        }

        for (const issue of result.headerIssues) {
            if (issue.error) {
                console.log(`✗ 文件读取错误: ${targetLang}/${issue.file}`);
                console.log(`  - 错误: ${issue.error}\n`);
                continue;
            }

            for (const diff of issue.differences) {
                console.log(`✗ Header 结构不一致: ${targetLang}/${issue.file}`);
                console.log(`  - 源文档 H${diff.level} 数量: ${diff.sourceCount}`);
                console.log(`  - 目标文档 H${diff.level} 数量: ${diff.targetCount}`);
                if (diff.line) {
                    console.log(`  - 差异位置: 第 ${diff.line} 行`);
                }
                console.log('');
            }
        }
    }

    const errorCount = Object.values(report.targetResults)
        .filter(r => !r.passed).length;
    
    console.log(`总计: ${errorCount} 个语言存在问题`);
}

async function main() {
    const args = parseArgs();

    if (args.help) {
        printHelp();
        process.exit(0);
    }

    const docRoot = join(process.cwd(), DOC_ROOT);
    
    console.log(`检查配置:`);
    console.log(`  源语言: ${args.source}`);
    console.log(`  目标语言: ${args.targets.join(', ')}`);
    console.log(`  文档根目录: ${docRoot}\n`);

    const report = await checkDocuments(args.source, args.targets, docRoot);
    printReport(report, args.source);

    const hasErrors = Object.values(report.targetResults)
        .some(r => !r.passed);

    process.exit(hasErrors ? 1 : 0);
}

main().catch(error => {
    console.error('执行错误:', error);
    process.exit(1);
});
