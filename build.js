const fs = require('fs').promises;
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const blocksDir = path.join(viewsDir, 'blocks');
const outputDir = path.join(__dirname, 'public', 'html');

async function loadBlocks() {
  const blocks = {};
  const files = await fs.readdir(blocksDir);
  for (const file of files) {
    if (file.endsWith('.html')) {
      const blockName = path.basename(file, '.html').toUpperCase();
      const content = await fs.readFile(path.join(blocksDir, file), 'utf8');
      blocks[blockName] = content;
    }
  }
  return blocks;
}

async function renderPage(pageName, blocks) {
  const pagePath = path.join(viewsDir, `${pageName}.html`);
  let content = await fs.readFile(pagePath, 'utf8');
  for (const [blockName, blockContent] of Object.entries(blocks)) {
    const placeholder = `<!--${blockName}-->`;
    content = content.replace(new RegExp(placeholder, 'g'), blockContent);
  }
  return content;
}

async function build() {
  await fs.mkdir(outputDir, { recursive: true });
  const blocks = await loadBlocks();
  const files = await fs.readdir(viewsDir);

  for (const file of files) {
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    if (ext === '.html' && name !== 'blocks') {
      const rendered = await renderPage(name, blocks);
      const outputPath = path.join(outputDir, name === 'index' ? 'index.html' : `${name}.html`);
      await fs.writeFile(outputPath, rendered, 'utf8');
      console.log(`Страница ${name} собрана в ${outputPath}`);
    }
  }
}

build().catch(console.error);
