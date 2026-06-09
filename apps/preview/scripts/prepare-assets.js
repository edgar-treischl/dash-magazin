#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Paths
const storiesDir = path.join(__dirname, '..', '..', '..', 'stories');
const publicDir = path.join(__dirname, '..', 'public');
const publicStoriesDir = path.join(publicDir, 'stories');

// Create public/stories directory if it doesn't exist
if (!fs.existsSync(publicStoriesDir)) {
  fs.mkdirSync(publicStoriesDir, { recursive: true });
}

// Copy all story assets
const storyDirs = fs.readdirSync(storiesDir).filter(f => {
  const fullPath = path.join(storiesDir, f);
  return fs.statSync(fullPath).isDirectory();
});

let copiedCount = 0;

storyDirs.forEach(storySlug => {
  const assetsDir = path.join(storiesDir, storySlug, 'assets');
  
  if (fs.existsSync(assetsDir)) {
    const destDir = path.join(publicStoriesDir, storySlug, 'assets');
    
    // Create destination directory
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copy all files from assets
    const files = fs.readdirSync(assetsDir);
    files.forEach(file => {
      const src = path.join(assetsDir, file);
      const dest = path.join(destDir, file);
      
      // Only copy if source is a file
      if (fs.statSync(src).isFile()) {
        fs.copyFileSync(src, dest);
        copiedCount++;
      }
    });
  }
});

console.log(`✓ Copied ${copiedCount} story assets to public/`);
