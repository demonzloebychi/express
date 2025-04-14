const backToTop = document.getElementById("back-to-top");
const scrollChangeButton = 1920; // Порог прокрутки

window.addEventListener('scroll', function() {
  const scrollpos = window.scrollY;
  
  if (scrollpos >= scrollChangeButton) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});


 document.addEventListener("DOMContentLoaded", function () {
  backToTop.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

