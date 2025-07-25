/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/



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


/******/ })()
;
//# sourceMappingURL=main.js.map

