const swiper = new Swiper(".blog-single-swiper", {
  slidesPerView: "auto",
  breakpoints: {
    320: {
      spaceBetween: 0,
    },
    570: {
      slidesPerView: "2",
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: "3",
      spaceBetween: 40,
    },
    1920: {
      slidesPerView: "3",
      spaceBetween: 55,
    }
  },

  // Navigation arrows
  navigation: {
    nextEl: ".blog-single-swiper__btn--next",
    prevEl: ".blog-single-swiper__btn--prev",
  },
});