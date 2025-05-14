const burgerIcon = document.querySelector(".burger");
const burger = document.querySelector(".header__burger");
const headerTop = document.querySelector(".header__top");
const headerBottom = document.querySelector('.header__bottom')
if (burgerIcon) {
  burgerIcon.addEventListener("click", function (e) {
    document.body.classList.toggle("lock");
    burger.classList.toggle("active");
    header.classList.toggle("active");
    headerBottom.classList.toggle("active");
    headerTop.classList.toggle("active");


  });
}



document.addEventListener('DOMContentLoaded', function () {
  // Проверяем, мобильное ли устройство (тачскрин)
  function isMobile() {
    return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }

  // Проверяем ширину экрана
  function isSmallScreen() {
    return window.innerWidth < 1024;
  }

  if (isMobile() || isSmallScreen()) {
    document.querySelectorAll('.menu-block__list > li').forEach(function (menuItem) {
      const link = menuItem.querySelector('.menu-block__link');
      const subMenu = menuItem.querySelector('.sub-menu-block__list');
      if (link && subMenu) {
        let opened = false;

        link.addEventListener('click', function (e) {
          if (!opened) {
            e.preventDefault(); // Первый клик - открываем подменю

            // Скрываем все остальные подменю
            document.querySelectorAll('.sub-menu-block__list').forEach(function (sm) {
              if (sm !== subMenu) sm.style.display = 'none';
            });

            subMenu.style.display = 'block';
            opened = true;
          } else {
            // Второй клик - переход по ссылке
            window.location = link.href;
          }
        });

        // Закрываем подменю при клике вне меню
        document.addEventListener('click', function (e) {
          if (!menuItem.contains(e.target)) {
            subMenu.style.display = 'none';
            opened = false;
          }
        });
      }
    });
  }
});






