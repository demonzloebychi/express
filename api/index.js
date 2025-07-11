require('dotenv').config();

const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const fetch = require('node-fetch');
const serverless = require('serverless-http');

const app = express();


// const nodemailer = require('nodemailer');




const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(express.json()); // Чтобы сервер мог принимать JSON в теле POST-запросов


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
    const htmlRoutePath = routePath + '.html';

    // Редирект с /page.html на /page
    app.get(htmlRoutePath, (req, res) => {
      res.redirect(301, routePath);
    });

    // Основной маршрут без расширения
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
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      })
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description);
    }

    res.json({ message: 'Заявка успешно отправлена в Telegram' });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    res.status(500).json({ message: 'Ошибка сервера при отправке сообщения в Telegram' });
  }
});

// const transporter = nodemailer.createTransport({
//   host: 'smtp.mail.ru',
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'nikolaislnkv@mail.ru',
//     pass: 'BKx2qdiyt3hZF6zArxgp'
//   }
// });

// app.post('/api/call', async (req, res) => {
//   const { name, phone, comment, site, policy } = req.body;

//   if (!phone || !policy) {
//     return res.status(400).json({ message: 'Телефон и согласие с политикой обязательны' });
//   }

//   const mailOptions = {
//     from: 'nikolaislnkv@mail.ru',
//     to: 'nikolaislnkv@mail.ru',
//     subject: 'Новая заявка с сайта',
//     text: `
// Имя: ${name || 'Не указано'}
// Телефон: ${phone}
// Комментарий: ${comment || 'Не указан'}
// Сайт: ${site || 'Не указан'}
//     `
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.json({ message: 'Заявка успешно отправлена' });
//   } catch (error) {
//     console.error('Ошибка отправки письма:', error);
//     res.status(500).json({ message: 'Ошибка сервера при отправке письма' });
//   }
// });


(async () => {
  await createRoutes(app);
})();

module.exports = app;
