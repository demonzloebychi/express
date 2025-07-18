document.querySelector('.base-btn').addEventListener('click', function() {
  const scrollToElement = document.querySelector('#regForm');
  const offset = 170; // высота шапки или другой нужный зазор
  const elementPosition = scrollToElement.getBoundingClientRect().top;
  const scrollOffsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: scrollOffsetPosition,
    behavior: 'smooth'
  });
});
