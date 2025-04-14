const header = document.querySelector('.header');
const scrollChange = 920; // Порог прокрутки

window.addEventListener('scroll', function() {
  const scrollpos = window.scrollY;
  
  if (scrollpos >= scrollChange) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


  
