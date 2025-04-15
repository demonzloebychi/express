const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

const viewsDir = path.join(__dirname, '..', 'views');
const blocksDir = path.join(viewsDir, 'blocks');

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

async function renderPage(pageName) {
  const pagePath = path.join(viewsDir, `${pageName}.html`);
  let pageContent = await fs.readFile(pagePath, 'utf8');

  const blocks = await loadBlocks();

  for (const [blockName, content] of Object.entries(blocks)) {
    const placeholder = `<!--${blockName}-->`;
    pageContent = pageContent.replace(new RegExp(placeholder, 'g'), content);
  }

  return pageContent;
}

async function createRoutes(app) {
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
  }
}


app.use((req, res, next) => {
  // Проверяем, заканчивается ли URL на ".html"
  if (req.url.endsWith('.html')) {
    // Убираем ".html" из URL и делаем редирект
    const newUrl = req.url.slice(0, -5); // Удаляем последние 5 символов (".html")
    res.redirect(301, newUrl); // 301 - постоянный редирект
  } else {
    next(); // Если URL не заканчивается на ".html", продолжаем обработку
  }
});


// Создаем маршруты и экспортируем app
(async () => {
  await createRoutes(app);
})();

module.exports = app;
