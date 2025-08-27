const swiper = new Swiper(".swiper", {
  // Optional parameters
  loop: true,
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
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});