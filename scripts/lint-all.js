#!/usr/bin/env node

import { execSync } from 'child_process';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const srcDir = 'src/app';

function getTypeScriptFiles(dir, maxDepth = 3) {
  const files = [];
  
  function scanDirectory(currentDir, depth = 0) {
    if (depth > maxDepth) return;
    
    try {
      const items = readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = join(currentDir, item);
        
        try {
          const stat = statSync(fullPath);
          
          if (stat.isDirectory()) {
            scanDirectory(fullPath, depth + 1);
          } else if (item.endsWith('.ts') && !item.endsWith('.spec.ts')) {
            files.push(fullPath);
          }
        } catch (error) {
          // Skip files we can't access
          console.warn(`Warning: Cannot access ${fullPath}`);
        }
      }
    } catch (error) {
      // Skip directories we can't access
      console.warn(`Warning: Cannot access directory ${currentDir}`);
    }
  }
  
  scanDirectory(dir);
  return files;
}

function lintFile(filePath) {
  try {
    console.log(`Linting: ${filePath}`);
    execSync(`node --max-old-space-size=4096 ./node_modules/.bin/eslint "${filePath}" --fix`, {
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log(`✅ Successfully linted: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to lint: ${filePath}`);
    console.error(error.message);
    return false;
  }
}

async function lintFilesInChunks(files, chunkSize = 5) {
  const results = {
    success: 0,
    failed: 0,
    total: files.length
  };
  
  console.log(`Found ${files.length} TypeScript files to lint in chunks of ${chunkSize}:`);
  files.forEach(file => console.log(`  - ${file}`));
  console.log('');
  
  // Process files in chunks
  for (let i = 0; i < files.length; i += chunkSize) {
    const chunk = files.slice(i, i + chunkSize);
    console.log(`\n--- Processing chunk ${Math.floor(i / chunkSize) + 1}/${Math.ceil(files.length / chunkSize)} ---`);
    
    for (const file of chunk) {
      const success = lintFile(file);
      if (success) {
        results.success++;
      } else {
        results.failed++;
      }
    }
    
    // Small delay between chunks to allow garbage collection
    if (i + chunkSize < files.length) {
      console.log('Waiting 1 second before next chunk...');
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  return results;
}

// Get all TypeScript files in the src/app directory
const files = getTypeScriptFiles(srcDir);

if (files.length === 0) {
  console.log('No TypeScript files found to lint.');
  process.exit(0);
}

// Process files in chunks
const results = await lintFilesInChunks(files, 3);

console.log('\n🎉 Linting completed!');
console.log(`Results: ${results.success} successful, ${results.failed} failed, ${results.total} total`); 