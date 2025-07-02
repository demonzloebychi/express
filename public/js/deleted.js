//здесь помещаю удаленные куски кода, из-за частых изменений многое пришлось переделывать, поэтому выношу их отдельно, чтобы не мешались в файле main.js. Этот файл никуда не подключен.


// const spoilerItems = document.querySelectorAll(".spoiler-item");

// for (let i = 0; i < spoilerItems.length; i++) {
//   spoilerItems[i].addEventListener("click", function () {
//     this.classList.toggle("active");

//     for (let j = 0; j < spoilerItems.length; j++) {
//       if (spoilerItems[j] !== this) {
//         spoilerItems[j].classList.remove("active");
//       }

//     }
//   });
// }

// function toggleActiveClass() {
//   const spoilerItems = document.querySelectorAll('.spoiler-item');

//   if (document.documentElement.clientWidth <= 768) {
//       spoilerItems.forEach(item => {
//           item.classList.add('active');
//       });
//   } else {
//       spoilerItems.forEach(item => {
//           item.classList.remove('active');
//       });
//   }
// }

// // Вызов функции при загрузке страницы
// toggleActiveClass();

// // Отслеживание изменения размера окна
// window.addEventListener('resize', toggleActiveClass);
















///old menu

// let link = document.querySelectorAll(".menu__link");
// for (i = 0; i < link.length; i++) {
//   let subMenu = link[i].nextElementSibling;
//   let thisLink = link[i];
//   link[i].addEventListener("click", function () {
//     subMenu.classList.toggle("open");
//     thisLink.classList.toggle("active");
//   });
// }
// let subLink = document.querySelectorAll(".sub-menu__link");
// for (i = 0; i < subLink.length; i++) {
//   let subSubMenu = subLink[i].nextElementSibling;
//   let thisSubLink = subLink[i];
//   subLink[i].addEventListener("click", function () {
//     subSubMenu.classList.toggle("open");
//     thisSubLink.classList.toggle("active");
//     for (let j = 0; j < subLink.length; j++) {
//       if (subLink[j] !== this) {
//         subLink[j].classList.remove("active");
//         subLink[j].nextElementSibling.classList.remove("open");
//       }
//     }
//   });
// }


// document.addEventListener("DOMContentLoaded", function() {
//   let menuLinks = document.querySelectorAll(".menu__link");
//   let subLinks = document.querySelectorAll(".sub-menu__link");

//   // Обработчик для главных пунктов меню
//   menuLinks.forEach((link, index) => {
//     link.addEventListener("click", function(event) {
//       // Если это первая ссылка "Услуги", предотвращаем переход
//       if (index === 0) {
//         event.preventDefault(); // Предотвращаем переход по ссылке
//         let subMenu = this.nextElementSibling;

//         // Закрываем все подменю
//         menuLinks.forEach(otherLink => {
//           if (otherLink !== this) {
//             let otherSubMenu = otherLink.nextElementSibling;
//             if (otherSubMenu) {
//               otherSubMenu.classList.remove("open");
//               otherLink.classList.remove("active");
//             }
//           }
//         });

//         // Переключаем текущее подменю
//         if (subMenu) {
//           subMenu.classList.toggle("open");
//           this.classList.toggle("active");
//         }
//       } else {
//         // Для остальных ссылок разрешаем переход
//         window.location.href = this.href; // Переход по ссылке
//       }
//     });
//   });

//   // Обработчик для подменю
//   subLinks.forEach(subLink => {
//     subLink.addEventListener("click", function(event) {
//       event.stopPropagation(); // Предотвращаем всплытие события

//       let subSubMenu = this.nextElementSibling;

//       // Закрываем все остальные подподменю
//       subLinks.forEach(otherSubLink => {
//         if (otherSubLink !== this) {
//           let otherSubSubMenu = otherSubLink.nextElementSibling;
//           if (otherSubSubMenu) {
//             otherSubSubMenu.classList.remove("open");
//             otherSubLink.classList.remove("active");
//           }
//         }
//       });

//       // Переключаем текущее подподменю
//       if (subSubMenu) {
//         subSubMenu.classList.toggle("open");
//         this.classList.toggle("active");
//       }
//     });
//   });
// });

// document.addEventListener("DOMContentLoaded", function() {
//   let menuLinks = document.querySelectorAll(".menu__link");
//   let subLinks = document.querySelectorAll(".sub-menu__link");

//   // Обработчик для главных пунктов меню
//   menuLinks.forEach((link, index) => {
//       let clickCount = 0; // Счетчик кликов для каждого элемента меню
//       let subMenuOpen = false; // Флаг для отслеживания открытия подменю

//       link.addEventListener("click", function(event) {
         
//           if (index === 0) {
//               event.preventDefault(); // Предотвращаем переход по ссылке
//               let subMenu = this.nextElementSibling;
//               clickCount++;


//               if (clickCount === 1) {
//                   // Закрываем все подменю
//                   menuLinks.forEach(otherLink => {
//                       if (otherLink !== this) {
//                           let otherSubMenu = otherLink.nextElementSibling;
//                           if (otherSubMenu && otherSubMenu.classList.contains("open")) {
//                               otherSubMenu.classList.remove("open");
//                               otherLink.classList.remove("active");
//                           }
//                       }
//                   });

//                   // Переключаем текущее подменю
//                   if (subMenu) {
//                       subMenu.classList.toggle("open");
//                       this.classList.toggle("active");
//                       subMenuOpen = subMenu.classList.contains("open");
//                   }
//               } else if (clickCount === 2 && subMenuOpen) {
//                   // Сбрасываем счетчик и переходим по ссылке
//                   clickCount = 0;
//                   subMenuOpen = false;
//                   window.location.href = this.href;

//               } else if (clickCount === 2 && !subMenuOpen){
//                 clickCount = 0;
//                 subMenuOpen = false;
//               }
//           } else {
//               // Для остальных ссылок разрешаем переход
//               window.location.href = this.href; // Переход по ссылке
//           }
//       });
//   });


//   // Обработчик для подменю
//   subLinks.forEach(subLink => {
//       let subClickCount = 0; // Счетчик кликов для каждого элемента подменю
//       let subSubMenuOpen = false; // Флаг для отслеживания открытия подподменю

//       subLink.addEventListener("click", function(event) {
//           event.stopPropagation(); // Предотвращаем всплытие события

//           let subSubMenu = this.nextElementSibling;
//           subClickCount++;

//           if (subClickCount === 1) {
//               // Закрываем все остальные подподменю
//               subLinks.forEach(otherSubLink => {
//                   if (otherSubLink !== this) {
//                       let otherSubSubMenu = otherSubLink.nextElementSibling;
//                       if (otherSubSubMenu && otherSubSubMenu.classList.contains("open")) {
//                           otherSubSubMenu.classList.remove("open");
//                           otherSubLink.classList.remove("active");
//                       }
//                   }
//               });

//               // Переключаем текущее подподменю
//               if (subSubMenu) {
//                   subSubMenu.classList.toggle("open");
//                   this.classList.toggle("active");
//                   subSubMenuOpen = subSubMenu.classList.contains("open");
//               }
//           } else if (subClickCount === 2 && subSubMenuOpen) {
//               subClickCount = 0;
//               subSubMenuOpen = false;
//               window.location.href = this.href;
//           }else if (subClickCount === 2 && !subSubMenuOpen) {
//               subClickCount = 0;
//               subSubMenuOpen = false;
//           }
//       });
//   });
// });












//old header


// const burgerIcon = document.querySelector(".burger");
// const burger = document.querySelector(".header__burger");
// const menu = document.querySelector(".menu");
// const main = document.querySelector(".main");
// const footer = document.querySelector(".footer");
// const header = document.querySelector(".header");
// const menus = document.querySelector(".menus");
// if (burgerIcon) {
//   burgerIcon.addEventListener("click", function (e) {
//     document.body.classList.toggle("lock");
//     burger.classList.toggle("active");
//     menu.classList.toggle("active");
//     main.classList.toggle("active");
//     footer.classList.toggle("active");
//     header.classList.toggle("active");
//     menus.classList.toggle("active");
//   });
// }
