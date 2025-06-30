const csirSwiper = new Swiper('.csir-swiper', {
  // Optional parameters
  // direction: 'vertical',
  // loop: true,

  // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

  // Navigation arrows
  navigation: {
    nextEl: '.csir-swiper-button-next',
    prevEl: '.csir-swiper-button-prev',
  },
   spaceBetween: 20,


});

const otherCaseSwiper = new Swiper('.other-case-swiper', {
  // Optional parameters
  // direction: 'vertical',
  // loop: true,

  // If we need pagination
  pagination: {
    el: '.other-case-swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.other-case-swiper-button-next',
    prevEl: '.other-case-swiper-button-prev',
  },
   spaceBetween: 20,

   slidesPerView: 1, // по умолчанию на десктопе
  breakpoints: {
    992: { // на планшетах и выше
      slidesPerView: 1,
    },
    0: { // на мобильных
      slidesPerView: 1.1, // или 1.15 — подберите под свой дизайн
      spaceBetween: 16,   // или другой нужный отступ
    }
  }
});


const moreCaseSwiper = new Swiper('.more-case-swiper', {
  // Optional parameters
  // direction: 'vertical',
  // loop: true,

  // If we need pagination
  pagination: {
    el: '.more-case-swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.more-case-swiper-button-next',
    prevEl: '.more-case-swiper-button-prev',
  },
   spaceBetween: 20,

   slidesPerView: 1, // по умолчанию на десктопе
  breakpoints: {
    992: { // на планшетах и выше
      slidesPerView: 2,
    },
    0: { // на мобильных
      slidesPerView: 1.1, // или 1.15 — подберите под свой дизайн
      spaceBetween: 16,   // или другой нужный отступ
    }
  }
});