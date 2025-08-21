// api/posts/index.js

const postsPerPage = 5;
const maxPages = 4;

// Генерация случайных тегов
function getRandomTags() {
  const tags = ['Разработка', 'Дизайн', 'SEO', 'AI', 'Маркетинг', 'Менеджмент'];
  const count = Math.floor(Math.random() * 3) + 1; // 1-3 тега
  const shuffled = tags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Создание одного поста с id
function generatePost(id) {
  return {
    imageUrl: '/img/blog/blog-img.png',
    authorImage: '/img/blog/blog-autor.png',
    authorName: `Автор ${id}`,
    date: `0${(id % 28) + 1}.0${((id + 1) % 12) + 1}.25`,
    views: (Math.floor(Math.random() * 1000000)).toString(),
    readTime: `${Math.floor(Math.random() * 10) + 3} минут`,
    title: `Заголовок статьи №${id}`,
    tags: getRandomTags(),
    url: `/blog/post-${id}`
  }
}

// Обработка запроса
export default function handler(req, res) {
  const { page = 1, tag } = req.query;
  const pageNum = parseInt(page, 10);

  if (pageNum > maxPages) {
    res.status(200).json({ posts: [], hasMore: false });
    return;
  }

  // Создаём посты для запрошенной страницы
  const posts = [];
  const startId = (pageNum - 1) * postsPerPage + 1;
  for (let i = startId; i < startId + postsPerPage; i++) {
    const post = generatePost(i);
    // Если указан фильтр по тегу, фильтруем посты
    if (!tag || post.tags.includes(tag)) {
      posts.push(post);
    }
  }
  // Если после фильтра по тегу постов нет — вернуть пустой массив
  const hasMore = pageNum < maxPages;

  res.status(200).json({ posts, hasMore });
}
