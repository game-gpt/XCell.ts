import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import os from 'os';

function getXcellExecutable(projectRoot) {
    const platform = os.platform();
    const ext = platform === 'win32' ? '.exe' : '';
    return path.join(projectRoot, 'target', 'debug', `xcell${ext}`);
}

function findProjectDirectories(examplesDir) {
    const projects = [];
    const entries = fs.readdirSync(examplesDir, { withFileTypes: true });
    
    for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        
        const dirPath = path.join(examplesDir, entry.name);
        const settingsPath = path.join(dirPath, 'ProjectSettings.toml');
        
        if (fs.existsSync(settingsPath)) {
            projects.push(dirPath);
        }
    }
    
    return projects.sort();
}

async function main() {
    const __filename = fileURLToPath(import.meta.url);
    const scriptDir = path.dirname(__filename);
    const projectRoot = path.resolve(scriptDir, '..');
    const examplesDir = path.join(projectRoot, 'examples');
    
    console.log('Finding xcell executable...');
    
    const xcellPath = getXcellExecutable(projectRoot);
    
    if (!fs.existsSync(xcellPath)) {
        console.error(`xcell not found at: ${xcellPath}`);
        console.error('Please run "cargo build" first to compile xcell.');
        return;
    }
    
    console.log(`Found xcell at: ${xcellPath}`);
    
    const projectDirs = findProjectDirectories(examplesDir);
    
    console.log(`\nFound ${projectDirs.length} project directories:`);
    for (const dir of projectDirs) {
        console.log(`  - ${path.basename(dir)}`);
    }
    
    for (const projectDir of projectDirs) {
        const projectName = path.basename(projectDir);
        console.log(`\n${'='.repeat(50)}`);
        console.log(`Processing: ${projectName}`);
        console.log('='.repeat(50));
        
        try {
            execSync(`"${xcellPath}"`, { cwd: projectDir, stdio: 'inherit' });
            console.log(`[${projectName}] xcell generate completed successfully!`);
            
            console.log(`[${projectName}] Verifying generated files...`);
            
            const unityGeneratedDir = path.join(projectDir, 'unity');
            if (fs.existsSync(unityGeneratedDir)) {
                const files = fs.readdirSync(unityGeneratedDir);
                console.log(`[${projectName}] Unity: ${files.length} files generated`);
            } else {
                console.warn(`[${projectName}] Unity generated files directory not found`);
            }
            
            const cocosGeneratedDir = path.join(projectDir, 'cocos');
            if (fs.existsSync(cocosGeneratedDir)) {
                const files = fs.readdirSync(cocosGeneratedDir);
                console.log(`[${projectName}] Cocos: ${files.length} files generated`);
            } else {
                console.warn(`[${projectName}] Cocos generated files directory not found`);
            }
        } catch (error) {
            console.error(`[${projectName}] xcell generate failed:`, error.message);
            continue;
        }
    }
    
    console.log(`\n${'='.repeat(50)}`);
    console.log('All tasks completed!');
    console.log('='.repeat(50));
}

main().catch(console.error);
