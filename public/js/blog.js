const urlParams = new URLSearchParams(window.location.search);
const currentPage = urlParams.get("page") || "1";
const currentTag = urlParams.get("tag") || "all";
const tagItems = document.querySelectorAll(".blog-tag__item a");

const paginationItems = document.querySelectorAll(
  ".a-blog-pagination a.pagination-item"
);

paginationItems.forEach((item) => {
  item.classList.remove("current");
  if (item.getAttribute("data-page") === currentPage) {
    item.classList.add("current");
  }
});

tagItems.forEach((tag) => {
    tag.classList.remove('active');
    if (tag.getAttribute('data-tag') === currentTag) {
        tag.classList.add('active')
    }
})


// document.addEventListener("DOMContentLoaded", () => {
//   const postsContainer = document.querySelector('.a-blog__list');
//   const loadMoreBtn = document.querySelector('.a-blog__load-more');
//   const paginationItems = document.querySelectorAll('.pagination-item');

//   let currentPage = 1;
//   const maxPages = 4;
//   const postsPerPage = 5;

//   // Моковая функция для эмуляции API (замените на fetch при реальной работе)
//   function fetchPostsMock(page = 1) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (page > maxPages) {
//           resolve({ posts: [], hasMore: false });
//           return;
//         }
//         const posts = [];
//         const startId = (page - 1) * postsPerPage + 1;
//         for (let i = startId; i < startId + postsPerPage; i++) {
//           posts.push({
//             id: i,
//             title: `Пост номер ${i}`,
//             imageUrl: '/img/blog/blog-img.png',
//             authorImage: '/img/blog/blog-autor.png',
//             authorName: 'Автор ' + i,
//             date: '11.02.23',
//             views: (Math.floor(Math.random() * 10000)).toString(),
//             readTime: `${Math.floor(Math.random() * 10) + 1} минут`,
//             tags: ['Разработка', 'Дизайн'],
//             url: '#'
//           });
//         }
//         resolve({ posts, hasMore: page < maxPages });
//       }, 300);
//     });
//   }

//   function createPostElement(post) {
//     const li = document.createElement('li');
//     li.className = 'a-blog__item a-blog-item';
//     li.innerHTML = `
//       <div class="a-blog-item__img">
//         <img src="${post.imageUrl}" alt="" />
//       </div>
//       <div class="a-blog-item__about">
//         <div class="a-blog-item__info">
//           <div class="a-blog-item__author">
//             <div class="a-blog-item__author-img">
//               <img src="${post.authorImage}" alt="${post.authorName}" />
//             </div>
//             <div class="a-blog-item__author-name">${post.authorName}</div>
//           </div>
//           <div class="a-blog-item__deep-info">
//             <div class="a-blog-item__date"> <span>${post.date}</span> </div>
//             <div class="a-blog-item__views"> <span>${post.views}</span> </div>
//             <div class="a-blog-item__time"> <span>${post.readTime}</span> </div>
//           </div>
//         </div>
//         <div class="a-blog-item__title">${post.title}</div>
//       </div>
//       <a href="${post.url}" class="a-blog-item__link">Читать статью</a>
//     `;
//     return li;
//   }

//   function updateActivePagination(page) {
//     paginationItems.forEach(item => {
//       item.classList.toggle('current', item.getAttribute('data-page') == page);
//     });
//   }

//   async function loadPage(page) {
//     const data = await fetchPostsMock(page);
//     postsContainer.innerHTML = ''; // очистка при загрузке новой страницы
//     data.posts.forEach(post => {
//       postsContainer.appendChild(createPostElement(post));
//     });
//     currentPage = page;
//     updateActivePagination(page);
//     loadMoreBtn.style.display = data.hasMore ? '' : 'none';
//   }

//   async function loadMore() {
//     const nextPage = currentPage + 1;
//     const data = await fetchPostsMock(nextPage);
//     data.posts.forEach(post => {
//       postsContainer.appendChild(createPostElement(post));
//     });
//     currentPage = nextPage;
//     updateActivePagination(currentPage);
//     if (!data.hasMore) loadMoreBtn.style.display = 'none';
//   }

//   // Инициализация
//   loadPage(1);

//   // Обработчики
//   loadMoreBtn.addEventListener('click', e => {
//     e.preventDefault();
//     loadMore();
//   });

//   paginationItems.forEach(item => {
//     item.addEventListener('click', e => {
//       e.preventDefault();
//       const page = parseInt(item.getAttribute('data-page'), 10);
//       if (page && page !== currentPage) {
//         loadPage(page);
//       }
//     });
//   });
// });

