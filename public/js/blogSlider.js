const swiper = new Swiper(".blog-single-swiper", {
  // loop: true,
  slidesPerView: "auto",
  breakpoints: {
    320: {
      // slidesPerView: 1,
      spaceBetween: 0,
    },
    570: {
      // slidesPerView: 2,
      spaceBetween: 30,
    },
    1440: {
      // slidesPerView: 3,
      spaceBetween: 40,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".blog-single-swiper__btn--next",
    prevEl: ".blog-single-swiper__btn--prev",
  },
});