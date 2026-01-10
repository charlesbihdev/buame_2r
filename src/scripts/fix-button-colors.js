#!/usr/bin/env node

/**
 * Button Color Fix Script for 2RBUAME
 * 
 * Ensures all green buttons have white text for proper contrast
 * 
 * Usage:
 *   node scripts/fix-button-colors.js [options]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');
const pathArg = args.find(arg => arg.startsWith('--path='));
const targetPath = pathArg 
    ? pathArg.split('=')[1] 
    : path.join(__dirname, '../resources/js');

// Patterns to fix green buttons with wrong text colors
const FIXES = [
    {
        name: 'Green button with dark text',
        pattern: /(bg-\[var\(--primary\)\]|bg-primary)([^>]*?)text-\[var\(--(foreground|buame-text-main)\)\]/gi,
        replacement: (match, bg, middle) => {
            return `${bg}${middle}text-white`;
        }
    },
    {
        name: 'Green button hover with dark text',
        pattern: /hover:bg-\[var\(--primary\)\]([^>]*?)hover:text-\[var\(--(foreground|buame-text-main)\)\]/gi,
        replacement: (match, middle) => {
            return `hover:bg-[var(--primary)]${middle}hover:text-white`;
        }
    },
    {
        name: 'Green background with foreground text in className',
        pattern: /(className="[^"]*bg-\[var\(--primary\)\][^"]*)\btext-\[var\(--foreground\)\]/gi,
        replacement: (match, before) => {
            return before.replace(/text-\[var\(--foreground\)\]/gi, 'text-white');
        }
    },
    {
        name: 'Full green button class with wrong text',
        pattern: /(bg-\[var\(--primary\)\][^"']*?)text-\[var\(--foreground\)\]/gi,
        replacement: (match, before) => {
            return `${before}text-white`;
        }
    }
];

function shouldProcessFile(filePath) {
    const ext = path.extname(filePath);
    if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
        return false;
    }
    return !filePath.includes('node_modules') && 
           !filePath.includes('.git') &&
           !filePath.includes('build');
}

function fixButtonColors(content, filePath) {
    let modified = content;
    const changes = [];
    
    for (const fix of FIXES) {
        const matches = modified.match(fix.pattern);
        if (matches) {
            const before = modified;
            modified = modified.replace(fix.pattern, fix.replacement);
            if (before !== modified) {
                changes.push({
                    type: fix.name,
                    count: matches.length
                });
            }
        }
    }
    
    return { modified, changes };
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { modified, changes } = fixButtonColors(content, filePath);
        
        if (changes.length > 0) {
            if (!isDryRun) {
                fs.writeFileSync(filePath, modified, 'utf8');
            }
            
            return {
                file: filePath,
                changes,
                modified: !isDryRun
            };
        }
        
        return null;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return null;
    }
}

function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findFiles(filePath, fileList);
        } else if (shouldProcessFile(filePath)) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

function main() {
    console.log('🎨 2RBUAME Button Color Fix Script\n');
    console.log(`Mode: ${isDryRun ? 'DRY RUN (no files will be modified)' : 'LIVE (files will be modified)'}`);
    console.log(`Target: ${targetPath}\n`);
    
    if (!fs.existsSync(targetPath)) {
        console.error(`❌ Error: Path does not exist: ${targetPath}`);
        process.exit(1);
    }
    
    const stats = fs.statSync(targetPath);
    const filesToProcess = stats.isFile() 
        ? [targetPath]
        : findFiles(targetPath);
    
    console.log(`Found ${filesToProcess.length} files to process\n`);
    
    const results = [];
    let totalChanges = 0;
    
    filesToProcess.forEach(file => {
        const result = processFile(file);
        if (result) {
            results.push(result);
            const fileChanges = result.changes.reduce((sum, c) => sum + c.count, 0);
            totalChanges += fileChanges;
            
            if (verbose) {
                console.log(`\n📄 ${file}`);
                result.changes.forEach(change => {
                    console.log(`   ${change.type} (${change.count} occurrences)`);
                });
            }
        }
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`Files processed: ${filesToProcess.length}`);
    console.log(`Files modified: ${results.length}`);
    console.log(`Total fixes: ${totalChanges}`);
    
    if (isDryRun) {
        console.log('\n⚠️  DRY RUN MODE - No files were actually modified');
        console.log('Run without --dry-run to apply changes');
    } else {
        console.log('\n✅ Button colors fixed successfully!');
        console.log('All green buttons now have white text for proper contrast.');
    }
    
    if (results.length > 0 && !verbose) {
        console.log('\nFixed files:');
        results.forEach(result => {
            const fileChanges = result.changes.reduce((sum, c) => sum + c.count, 0);
            console.log(`  • ${result.file} (${fileChanges} fixes)`);
        });
    }
    
    console.log('\n');
}

main();

