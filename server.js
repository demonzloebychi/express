// server.js для локального запуска
// const app = require('./api/index');

// const port = 3000;
// app.listen(port, () => {
//   console.log(`Сервер запущен на http://localhost:${port}`);
// });

require('dotenv').config();


const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;







// Подключение к MongoDB (замените строку на вашу)
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB подключен'))
  .catch(err => console.error(err));

// Мидлвар для парсинга JSON тела запросов
app.use(bodyParser.json());


const bcrypt = require('bcryptjs');
const User = require('./models/User');

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Проверка обязательных полей
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Все поля обязательны' });
    }

    // Проверка, что пользователь с таким username или email не существует
    const candidate = await User.findOne({ $or: [{ username }, { email }] });
    if (candidate) {
      return res.status(400).json({ message: 'Пользователь с таким логином или email уже существует' });
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание и сохранение пользователя
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


// const nodemailer = require('nodemailer');
const fetch = require('node-fetch');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.use(express.json()); // Чтобы сервер мог принимать JSON в теле POST-запросов

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


app.post('/api/call', async (req, res) => {
  const { name, phone, comment, site, policy } = req.body;

  if (!phone || !policy) {
    return res.status(400).json({ message: 'Телефон и согласие с политикой обязательны' });
  }

  // Формируем текст сообщения для Telegram
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
//     pass: 'PNJ5HSyymxhbhTJLhryZ'
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




app.listen(port, () => {
console.log(`Сервер запущен на http://localhost:${port}`);
});