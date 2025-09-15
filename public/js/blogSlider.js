const swiper = new Swiper(".blog-single-swiper", {
  slidesPerView: "auto",
  breakpoints: {
    320: {
      spaceBetween: 0,
    },
    570: {
      spaceBetween: 30,
    },
    1440: {
      spaceBetween: 55,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".blog-single-swiper__btn--next",
    prevEl: ".blog-single-swiper__btn--prev",
  },
});