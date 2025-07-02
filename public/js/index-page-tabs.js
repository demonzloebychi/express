//код только для index.html, был изначально подключен инлайном, тк в прошлой версии( на сборщике) он нормально не отрабатывал через файл, исправил это

function openTab(event, id) {
  var i, content, btn;

  closestImage1 = document.querySelector(".main-tab-1");
  closestImage2 = document.querySelector(".main-tab-2");
  closestImage3 = document.querySelector(".main-tab-3");
  defaultImage = document.querySelector(".defaul-image");
  content = document.getElementsByClassName("item-tabs-base__img");
  for (i = 0; i < content.length; i++) {
    content[i].style.display = "none";
    content[i].style.animation = "fadein 0.5s ease-in-out";
  }

  btn = document.getElementsByClassName("nav-tabs-base__item");
  for (i = 0; i < btn.length; i++) {
    btn[i].className = btn[i].className.replace(" is-active", "");
  }

  document.getElementById(id).style.display = "block";
  event.currentTarget.className += " is-active";

  if (event.type === "mouseout") {
    closestImage1.style.display = "none";
    closestImage2.style.display = "none";
    closestImage3.style.display = "none";
    defaultImage.style.display = "block";
  }
}