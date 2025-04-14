const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const viewsDir = path.join(__dirname, 'views');
const blocksDir = path.join(viewsDir, 'blocks');

// Функция для загрузки всех блоков из папки blocks
async function loadBlocks() {
  const blocks = {};
  const files = await fs.readdir(blocksDir);

  for (const file of files) {
    if (file.endsWith('.html')) {
      const blockName = path.basename(file, '.html').toUpperCase(); // например, HEADER
      const content = await fs.readFile(path.join(blocksDir, file), 'utf8');
      blocks[blockName] = content;
    }
  }

  return blocks;
}

// Универсальный рендерер страницы с подстановкой блоков
async function renderPage(pageName) {
  const pagePath = path.join(viewsDir, `${pageName}.html`);
  let pageContent = await fs.readFile(pagePath, 'utf8');

  const blocks = await loadBlocks();

  // Заменяем плейсхолдеры вида <!--HEADER--> на содержимое блоков
  for (const [blockName, content] of Object.entries(blocks)) {
    const placeholder = `<!--${blockName}-->`;
    pageContent = pageContent.replace(new RegExp(placeholder, 'g'), content);
  }

  return pageContent;
}

// Создаем маршруты для всех html-файлов в views (кроме папки blocks)
async function createRoutes() {
  const files = await fs.readdir(viewsDir);

  for (const file of files) {
    const ext = path.extname(file);
    const name = path.basename(file, ext);

    if (ext !== '.html' || name === 'blocks') continue;

    const routePath = name === 'index' ? '/' : `/${name}`;

    app.get(routePath, async (req, res) => {
      try {
        const html = await renderPage(name);
        res.send(html);
      } catch (err) {
        console.error(`Ошибка при рендеринге страницы ${name}:`, err);
        res.status(500).send('Ошибка сервера');
      }
    });

    console.log(`Маршрут создан: ${routePath} -> ${file}`);
  }
}

createRoutes();

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
