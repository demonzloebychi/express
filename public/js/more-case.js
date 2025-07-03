const moreCaseSwiper = new Swiper('.more-case-swiper', {


  // Navigation arrows
  navigation: {
    nextEl: '.more-case-swiper-button-next',
    prevEl: '.more-case-swiper-button-prev',
  },
   spaceBetween: 40,

   slidesPerView: 1, // по умолчанию на десктопе
  breakpoints: {
    993: { // на планшетах и выше
      slidesPerView: 2,
    },
    0: { // на мобильных
      slidesPerView: 1.1, // или 1.15 — подберите под свой дизайн
      spaceBetween: 20,   // или другой нужный отступ
    }
  }
});