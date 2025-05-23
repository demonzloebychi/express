/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
// const preloader = () => {
//   const images = document.images;
//   const images_total_count = images.length;
//   let images_loaded_count = 0;
//   const progress_bar = document.getElementById("progress");
//   const preNum = document.getElementById("preloader-num");
//   const preName = document.getElementById("preloader-name");

//   // Функция для обновления прелоудера
//   function updatePreloader() {
//     // Обновляем прогресс-бар плавно
//     progress_bar.style.width = `${100 / 400 * images_loaded_count}%`;

//     // Изменяем значения каждую секунду
//     if (images_loaded_count === 100) {
//       preNum.innerText = '02';
//       preName.innerText = 'Продвижение';
//     } else if (images_loaded_count === 200) {
//       preNum.innerText = '03';
//       preName.innerText = 'SEO';
//     } else if (images_loaded_count === 300) {
//       preNum.innerText = '04';
//       preName.innerText = 'Дизайн';
//     }
//     images_loaded_count++;
//   }

//   // Запускаем обновление прелоудера каждые 10 мс
//   const intervalId = setInterval(function () {
//     updatePreloader();

//     // Проверяем, достигли ли мы конца прелоудера
//     if (images_loaded_count >= 400) {
//       clearInterval(intervalId);
//       setTimeout(function () {
//         const preloader = document.getElementById("page-preloader");
//         if (!preloader.classList.contains("done")) {
//           preloader.classList.add("done");
//         }
//       }, 200);
//     }
//   }, 10); // Интервал в 10 мс
// };
// preloader();


const defImage = document.querySelector(".defaul-image");
const animItems = document.querySelectorAll("._anim-items");





if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll() {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;
      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }
      if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_active");
        }
      }
    }
    function offset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: rect.top + scrollTop,
        left: rect.left + scrollLeft
      };
    }
  }
  animOnScroll();
}


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



const accordionItems = document.querySelectorAll(".accordion-item");
for (let i = 0; i < accordionItems.length; i++) {
  accordionItems[i].addEventListener("click", function () {
    this.classList.toggle("active");
    for (let j = 0; j < accordionItems.length; j++) {
      if (accordionItems[j] !== this) {
        accordionItems[j].classList.remove("active");
      }
    }
  });
}
const cardLangMain = document.querySelectorAll(".card-lang");
const cardLangItems = document.querySelectorAll(".card-lang__item");
for (let i = 0; i < cardLangItems.length; i++) {
  cardLangItems[i].addEventListener("click", function () {
    // Убираем класс active у всех родительских элементов
    cardLangMain.forEach(card => card.classList.remove("active"));

    // Убираем класс active у всех дочерних элементов
    for (let j = 0; j < cardLangItems.length; j++) {
      if (cardLangItems[j] !== this) {
        cardLangItems[j].classList.remove("active");
      }
    }

    // Добавляем класс active к текущему элементу и его родителю
    this.classList.toggle("active");
    if (this.classList.contains("active")) {
      this.closest(".card-lang").classList.add("active");
    } else {
      this.closest(".card-lang").classList.remove("active");
    }
  });
}



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








let projectTab = function () {
  let projectTabNav = document.querySelectorAll(".nav-project__item"),
    projectTabContent = document.querySelectorAll(".project__body"),
    projectTabName;
  projectTabNav.forEach(item => {
    item.addEventListener("click", selectProjectTabNav);
  });
  function selectProjectTabNav() {
    projectTabNav.forEach(item => {
      item.classList.remove("is-active");
    });
    this.classList.add("is-active");
    projectTabName = this.getAttribute("data-tab-name");
    selectProjectTabContent(projectTabName);
  }
  function selectProjectTabContent(projectTabName) {
    projectTabContent.forEach(item => {
      item.classList.contains(projectTabName) ? item.classList.add("is-active") : item.classList.remove("is-active");
    });
    projectTabContent.forEach(item => {
      item.style.animation = "fadein 1s ease";
    });
  }
};
projectTab();

const anchors = document.querySelectorAll("a[href*='#']");
for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const blockID = anchor.getAttribute("href");
    document.querySelector(" " + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}
const swiperProducts = new Swiper(".products__body", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  breakpoints: {
    320: {
      slidesPerView: 1.4,
      spaceBetween: 20
    },
    485: {
      slidesPerView: 1.65
    },
    740: {
      slidesPerView: 1.95,
      spaceBetween: 40
    },
    1100: {
      slidesPerView: 2.95
    },
    1620: {
      slidesPerView: 3.95
    }
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true
  }
});
const swiperTeam = new Swiper(".team__body", {
  navigation: {
    nextEl: ".team-next",
    prevEl: ".team-prev"
  },
  breakpoints: {
    320: {
      slidesPerView: 1.35,
      spaceBetween: 20
    },
    485: {
      slidesPerView: 1.8
    },
    740: {
      slidesPerView: 3.4,
      spaceBetween: 40
    },
    1100: {
      slidesPerView: 4.4
    },
    1620: {
      slidesPerView: 5.7
    }
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true
  }
});
const swiperThanks = new Swiper(".thanks__body", {
  navigation: {
    nextEl: ".thanks-next",
    prevEl: ".thanks-prev"
  },
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 40
    }
  }
});
const swiperPhoto = new Swiper(".photo-items__wrapper", {
  navigation: {
    nextEl: ".photo-items-next",
    prevEl: ".photo-items-prev"
  },
  breakpoints: {
    320: {
      slidesPerView: 1.1,
      spaceBetween: 20
    },
    485: {
      slidesPerView: 1.5
    },
    740: {
      slidesPerView: 1.8
    },
    1100: {
      slidesPerView: 2.4,
      spaceBetween: 50
    },
    1620: {
      slidesPerView: 2.7
    }
  }
});

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

const spoilerItems = document.querySelectorAll('.spoiler-item');
function toggleActiveClass() {
  if (document.documentElement.clientWidth <= 768) {
    // Удаляем все обработчики клика
    spoilerItems.forEach(item => {
      item.removeEventListener("click", handleClick);
      item.classList.add('active'); // Добавляем класс active
    });
  } else {
    // Добавляем обработчики клика для экранов больше 768px
    spoilerItems.forEach(item => {
      item.classList.remove('active'); // Удаляем класс active
      item.addEventListener("click", handleClick);
    });
  }
}

function handleClick() {
  this.classList.toggle("active");
  for (let j = 0; j < spoilerItems.length; j++) {
    if (spoilerItems[j] !== this) {
      spoilerItems[j].classList.remove("active");
    }
  }
}

// Вызов функции при загрузке страницы
toggleActiveClass();

// Отслеживание изменения размера окна
window.addEventListener('resize', toggleActiveClass);
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("._anim-fade-in-left-delay");
  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.05}s`;
  });
});

// Набирающийся текст: начало
let typed = new Typed('#typed', {
  typeSpeed: 200,
  backSpeed: 100,
  startDelay: 3800,
  loop: false,
  stringsElement: '#typed-strings'
});
//Набирающийся текст: конец
/******/ })()
;
//# sourceMappingURL=main.js.map

