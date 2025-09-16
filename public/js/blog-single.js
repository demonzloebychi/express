const reactionButtons = document.querySelectorAll(".a-blog-reaction__button");

const pathSegments = window.location.pathname.split("/");
const articleSlug =
  pathSegments[pathSegments.length - 1] ||
  pathSegments[pathSegments.length - 2];

const reactionKey = `reaction_for_${articleSlug}`;

const reactionPopup = document.querySelector(".a-blog-reaction-popup");
const reactionPopupClose = document.querySelector(
  ".a-blog-reaction-popup__close"
);

reactionButtons.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    reactionButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    localStorage.setItem(reactionKey, index);
    reactionPopup.classList.add("active");
  });
});

reactionPopupClose.addEventListener("click", function () {
  reactionPopup.classList.remove("active");
});

window.addEventListener("load", () => {
  const savedIndex = localStorage.getItem(reactionKey);
  if (savedIndex !== null) {
    reactionButtons.forEach((btn, index) => {
      btn.classList.toggle("active", index == savedIndex);
    });
  }
});

document.querySelectorAll(".a-blog-navigation__list a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetText = link.textContent.trim();
    const heading = Array.from(
      document.querySelectorAll("h2, h3, h4, h5, h6")
    ).find((h) => h.textContent.trim() === targetText);
    if (heading) {
      heading.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const openArticleNavBtn = document.querySelector(".js-open-article-nav");
const articleNavMobile = document.querySelector(
  ".a-blog-single-article__nav-mobile"
);
const openArticleNavBtnIcon = document.querySelector(".icon");

openArticleNavBtn.addEventListener("click", function () {
  articleNavMobile.classList.toggle("active");
  openArticleNavBtn.classList.toggle("active");
  openArticleNavBtnIcon.classList.toggle("active");
});

window.addEventListener("resize", function () {
  if (window.innerWidth > 1024) {
    articleNavMobile.classList.remove("active");
  }
});



window.addEventListener("scroll", () => {
  if (window.innerWidth >= 1025) {
    const aside = document.querySelector(".a-blog-single__aside");
    const stickyBlock = document.querySelector(".a-blog-navigation-desktop");
    const bottomBlock = document.querySelector(".a-blog-popular"); 

    const asideRect = aside.getBoundingClientRect();
    const stickyRect = stickyBlock.getBoundingClientRect();
    const bottomRect = bottomBlock.getBoundingClientRect();

    const offsetTop = 200; 

    if (
      asideRect.top < offsetTop &&
      bottomRect.top > stickyRect.height + offsetTop
    ) {
      // Приклеиваем блок к верху
      stickyBlock.style.position = "fixed";
      stickyBlock.style.top = offsetTop + "px";
      stickyBlock.style.width = asideRect.width + "px";
    } else if (bottomRect.top <= stickyRect.height + offsetTop) {
      // Останавливаем перед нижними блоками
      stickyBlock.style.position = "absolute";
      stickyBlock.style.top =
        aside.offsetHeight -
        stickyBlock.offsetHeight -
        (aside.offsetHeight - bottomBlock.offsetTop) +
        -40 +
        "px";
      stickyBlock.style.width = "100%";
    } else {
      // Исходное состояние
      stickyBlock.style.position = "static";
      stickyBlock.style.top = "";
      stickyBlock.style.width = "";
    }
  }
});
