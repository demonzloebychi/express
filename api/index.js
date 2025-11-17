require('dotenv').config();

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

// На последних Node.js в Vercel fetch глобальный, импортировать node-fetch не нужно
// const fetch = require('node-fetch');
const serverless = require('serverless-http');

const app = express();

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(express.json()); // Для парсинга JSON в теле POST-запросов

// Статика из папки public доступна сейчас локально.
// В serverless среде лучше отдавать статику отдельным роутом, либо через CDN/Vercel Static
const publicDir = path.join(__dirname, '..', 'public');
// Отдача статики из serverless не рекомендуется, убираем app.use(express.static(...));

// Пути к шаблонам страниц и блокам
const viewsDir = path.join(__dirname, '..', 'views');
const blocksDir = path.join(viewsDir, 'blocks');

async function loadBlocks() {
  const blocks = {};
  const files = await fs.readdir(blocksDir);

  for (const file of files) {
    if (file.endsWith('.html')) {
      const name = path.basename(file, '.html').toUpperCase();
      blocks[name] = await fs.readFile(path.join(blocksDir, file), 'utf8');
    }
  }

  return blocks;
}

async function renderPage(pageName) {
  const pagePath = path.join(viewsDir, `${pageName}.html`);
  let content = await fs.readFile(pagePath, 'utf8');
  const blocks = await loadBlocks();

  for (const [blockName, blockContent] of Object.entries(blocks)) {
    const placeholder = `<!--${blockName}-->`;
    content = content.replace(new RegExp(placeholder, 'g'), blockContent);
  }

  return content;
}

// Инициализация роутов (делаем ее один раз, до старта)
async function createRoutes() {
  const files = await fs.readdir(viewsDir);

  for (const file of files) {
    const ext = path.extname(file);
    const name = path.basename(file, ext);

    if (ext !== '.html' || name === 'blocks') continue;

    const routePath = name === 'index' ? '/' : `/${name}`;
    const htmlRoute = routePath + '.html';

    // Редирект с /page.html на /page
    app.get(htmlRoute, (req, res) => res.redirect(301, routePath));

    // Основной маршрут
    app.get(routePath, async (req, res) => {
      try {
        const html = await renderPage(name);
        res.send(html);
      } catch (e) {
        console.error(`Ошибка рендеринга страницы ${name}`, e);
        res.status(500).send('Ошибка сервера');
      }
    });
  }
}

app.post('/api/call', async (req, res) => {
  const { name, phone, comment, site, policy } = req.body;

  if (!phone || !policy) {
    return res.status(400).json({ message: 'Телефон и согласие с политикой обязательны' });
  }

  const message = `
Новая заявка с сайта:
Имя: ${name || 'Не указано'}
Телефон: ${phone}
Комментарий: ${comment || 'Не указан'}
Сайт: ${site || 'Не указан'}
  `;

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message }),
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);

    res.json({ message: 'Заявка успешно отправлена в Telegram' });
  } catch (err) {
    console.error('Ошибка отправки в Telegram:', err);
    res.status(500).json({ message: 'Ошибка сервера при отправке сообщения в Telegram' });
  }
});

// Редиректы с *.html на URL без расширения
app.use((req, res, next) => {
  if (req.url.endsWith('.html')) {
    const newUrl = req.url.slice(0, -5);
    res.redirect(301, newUrl);
  } else {
    next();
  }
});

async function init() {
  await createRoutes();
  return app;
}

module.exports = async (req, res) => {
  const handler = await init();
  return handler(req, res);
};
