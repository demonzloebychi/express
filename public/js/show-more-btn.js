document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.show-more-btn');
  const list = document.querySelector('.business-sp-we-can__list');

  btn.addEventListener('click', () => {
    list.classList.toggle('show-all');

    if (list.classList.contains('show-all')) {
      btn.textContent = 'Скрыть';
    } else {
      btn.textContent = 'Показать еще';
    }
  });
});
