#!/usr/bin/env node

/**
 * Color Replacement Script for 2RBUAME
 *
 * This script scans JSX/JS files and replaces hardcoded hex colors
 * with CSS variable references from app.css
 *
 * Usage:
 *   node scripts/replace-colors.js [options]
 *
 * Options:
 *   --dry-run    Preview changes without modifying files
 *   --path       Specific file or directory to process (default: src/resources/js)
 *   --verbose    Show detailed output
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Color mapping based on app.css variables
const COLOR_MAPPINGS = {
    // Brand colors
    '#0F6B3F': 'var(--primary)',
    '#128A4F': 'var(--primary)', // Light variant
    '#0A5230': 'var(--buame-primary-dark)',

    // Golden Yellow
    '#F4B400': 'var(--secondary)',
    '#FFCA28': 'var(--secondary)', // Light variant
    '#C99400': 'var(--buame-secondary)', // Dark variant

    // Dark Blue
    '#1F3A5F': 'var(--accent)',
    '#2E4A73': 'var(--accent)', // Light variant
    '#152A47': 'var(--buame-accent)', // Dark variant

    // Text colors
    '#0d1b0d': 'var(--foreground)',
    '#1A2E23': 'var(--foreground)',
    '#1b1b18': 'var(--foreground)',
    '#4A6B5A': 'var(--muted-foreground)',

    // Background colors
    '#F8FAF9': 'var(--background)',
    '#f8fcf8': 'var(--background)',
    '#FDFDFC': 'var(--background)',
    '#0A1F14': 'var(--buame-background-dark)',
    '#102210': 'var(--buame-background-dark)',
    '#162816': 'var(--card)',
    '#132920': 'var(--card)',
    '#0a0a0a': 'var(--buame-background-dark)',
    '#ffffff': 'var(--card)',

    // Border colors
    '#e7f3e7': 'var(--buame-border-light)',
    '#D4E5DC': 'var(--border)',
    '#1F3D2E': 'var(--border)',

    // Bright green (legacy - map to primary)
    '#13ec13': 'var(--primary)',
    '#0fdc0f': 'var(--primary)',

    // WhatsApp colors (keep as-is, but document)
    // '#25D366': '#25D366', // WhatsApp green
    // '#20bd5a': '#20bd5a', // WhatsApp hover
};

// Context-aware replacements (colors that need context to determine correct variable)
const CONTEXT_REPLACEMENTS = [
    {
        // Dark backgrounds in dark mode
        pattern: /dark:bg-\[#(0d1b0d|162816|102210|0a1f14)\]/gi,
        replacement: (match, color) => {
            const colorMap = {
                '0d1b0d': 'var(--buame-background-dark)',
                162816: 'var(--card)',
                102210: 'var(--buame-background-dark)',
                '0a1f14': 'var(--buame-background-dark)',
            };
            return `dark:bg-[${colorMap[color.toLowerCase()] || `var(--card)`}]`;
        },
    },
    {
        // Text colors in dark mode
        pattern: /dark:text-\[#(13ec13|0d1b0d)\]/gi,
        replacement: (match, color) => {
            const colorMap = {
                '13ec13': 'var(--primary)',
                '0d1b0d': 'var(--foreground)',
            };
            return `dark:text-[${colorMap[color.toLowerCase()] || `var(--foreground)`}]`;
        },
    },
    {
        // Border colors
        pattern: /border-\[#(e7f3e7|13ec13)\]/gi,
        replacement: (match, color) => {
            const colorMap = {
                e7f3e7: 'var(--buame-border-light)',
                '13ec13': 'var(--primary)',
            };
            return `border-[${colorMap[color.toLowerCase()] || `var(--border)`}]`;
        },
    },
    {
        // Background colors with opacity
        pattern: /bg-\[#(13ec13|0d1b0d|102210)\]/gi,
        replacement: (match, color) => {
            const colorMap = {
                '13ec13': 'var(--primary)',
                '0d1b0d': 'var(--buame-background-dark)',
                102210: 'var(--buame-background-dark)',
            };
            return `bg-[${colorMap[color.toLowerCase()] || `var(--primary)`}]`;
        },
    },
    {
        // Text colors
        pattern: /text-\[#(0d1b0d|13ec13|1b1b18)\]/gi,
        replacement: (match, color) => {
            const colorMap = {
                '0d1b0d': 'var(--foreground)',
                '13ec13': 'var(--primary)',
                '1b1b18': 'var(--foreground)',
            };
            return `text-[${colorMap[color.toLowerCase()] || `var(--foreground)`}]`;
        },
    },
];

// Files to ignore
const IGNORE_PATTERNS = [/node_modules/, /\.git/, /build/, /dist/, /\.next/, /scripts/, /\.config\.js$/, /package\.json$/, /package-lock\.json$/];

// Get command line arguments
const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const verbose = args.includes('--verbose');
const pathArg = args.find((arg) => arg.startsWith('--path='));
const targetPath = pathArg ? pathArg.split('=')[1] : path.join(__dirname, '../resources/js');

/**
 * Check if file should be processed
 */
function shouldProcessFile(filePath) {
    const ext = path.extname(filePath);
    if (!['.js', '.jsx', '.ts', '.tsx'].includes(ext)) {
        return false;
    }

    return !IGNORE_PATTERNS.some((pattern) => pattern.test(filePath));
}

/**
 * Replace colors in file content
 */
function replaceColors(content, filePath) {
    let modified = content;
    const changes = [];

    // Fix: Green buttons should have white text
    // Pattern: bg-[var(--primary)] with text that's not white
    modified = modified.replace(
        /(bg-\[var\(--primary\)\]|bg-primary)([^>]*?)text-\[var\(--(foreground|buame-text-main)\)\]/gi,
        (match, bg, middle, textVar) => {
            changes.push({
                from: 'green button with dark text',
                to: 'green button with white text',
                count: 1,
            });
            return `${bg}${middle}text-white`;
        },
    );

    // Fix: Green buttons with hover states
    modified = modified.replace(
        /hover:bg-\[var\(--primary\)\]([^>]*?)hover:text-\[var\(--(foreground|buame-text-main)\)\]/gi,
        (match, middle, textVar) => {
            changes.push({
                from: 'green hover with dark text',
                to: 'green hover with white text',
                count: 1,
            });
            return `hover:bg-[var(--primary)]${middle}hover:text-white`;
        },
    );

    // Fix: Brand name corrections (BUAME 2R -> 2RBUAME and 2RBUAMI -> 2RBUAME)
    const buame2rMatches = modified.match(/BUAME\s*2R/gi);
    if (buame2rMatches) {
        modified = modified.replace(/BUAME\s*2R/gi, '2RBUAME');
        changes.push({
            from: 'BUAME 2R',
            to: '2RBUAME',
            count: buame2rMatches.length,
        });
    }

    const rbuamiMatches = modified.match(/2RBUAMI/gi);
    if (rbuamiMatches) {
        modified = modified.replace(/2RBUAMI/gi, '2RBUAME');
        changes.push({
            from: '2RBUAMI',
            to: '2RBUAME',
            count: rbuamiMatches.length,
        });
    }

    // Direct color replacements
    for (const [hexColor, cssVar] of Object.entries(COLOR_MAPPINGS)) {
        const regex = new RegExp(hexColor.replace('#', '\\#'), 'gi');
        const matches = modified.match(regex);

        if (matches) {
            modified = modified.replace(regex, cssVar);
            changes.push({
                from: hexColor,
                to: cssVar,
                count: matches.length,
            });
        }
    }

    // Context-aware replacements
    for (const { pattern, replacement } of CONTEXT_REPLACEMENTS) {
        const matches = modified.match(pattern);
        if (matches) {
            const before = modified;
            modified = modified.replace(pattern, replacement);
            if (before !== modified) {
                changes.push({
                    from: pattern.toString(),
                    to: 'context-aware replacement',
                    count: matches.length,
                });
            }
        }
    }

    return { modified, changes };
}

/**
 * Process a single file
 */
function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const { modified, changes } = replaceColors(content, filePath);

        if (changes.length > 0) {
            if (!isDryRun) {
                fs.writeFileSync(filePath, modified, 'utf8');
            }

            return {
                file: filePath,
                changes,
                modified: !isDryRun,
            };
        }

        return null;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return null;
    }
}

/**
 * Recursively find all files to process
 */
function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
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

/**
 * Main execution
 */
function main() {
    console.log('🎨 2RBUAME Color Replacement Script\n');
    console.log(`Mode: ${isDryRun ? 'DRY RUN (no files will be modified)' : 'LIVE (files will be modified)'}`);
    console.log(`Target: ${targetPath}\n`);

    if (!fs.existsSync(targetPath)) {
        console.error(`❌ Error: Path does not exist: ${targetPath}`);
        process.exit(1);
    }

    const stats = fs.statSync(targetPath);
    const filesToProcess = stats.isFile() ? [targetPath] : findFiles(targetPath);

    console.log(`Found ${filesToProcess.length} files to process\n`);

    const results = [];
    let totalChanges = 0;

    filesToProcess.forEach((file) => {
        const result = processFile(file);
        if (result) {
            results.push(result);
            const fileChanges = result.changes.reduce((sum, c) => sum + c.count, 0);
            totalChanges += fileChanges;

            if (verbose) {
                console.log(`\n📄 ${file}`);
                result.changes.forEach((change) => {
                    console.log(`   ${change.from} → ${change.to} (${change.count} occurrences)`);
                });
            }
        }
    });

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`Files processed: ${filesToProcess.length}`);
    console.log(`Files modified: ${results.length}`);
    console.log(`Total replacements: ${totalChanges}`);

    if (isDryRun) {
        console.log('\n⚠️  DRY RUN MODE - No files were actually modified');
        console.log('Run without --dry-run to apply changes');
    } else {
        console.log('\n✅ Changes applied successfully!');
    }

    if (results.length > 0 && !verbose) {
        console.log('\nModified files:');
        results.forEach((result) => {
            const fileChanges = result.changes.reduce((sum, c) => sum + c.count, 0);
            console.log(`  • ${result.file} (${fileChanges} changes)`);
        });
    }

    console.log('\n');
}

// Run the script
main();
