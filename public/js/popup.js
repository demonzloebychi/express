const popup = document.querySelector('#popup_regForm')
const popupClose = document.querySelector('.popup__close')
const submitForm = document.querySelector('#submit')
const popupOverlay = document.querySelector('.popup__overlay')

const nameInput = document.querySelector('#name')
const numberInput = document.querySelector('#number')
  
  // Функция проверки заполнения полей
  function checkFields() {
      return nameInput.value.trim() !== '' && numberInput.value.trim() !== '';
  }


  submitForm.addEventListener('click', function(e) {
      e.preventDefault(); 
      highlightEmptyFields();

      if (checkFields()) {
          popup.classList.add('active')
          popupOverlay.classList.add('active')
      } else {
        //   alert('Пожалуйста, заполните Обязательные поля!');
      }
  })
  
  function closePopup() {
      popup.classList.remove('active')
      popupOverlay.classList.remove('active')
  }
  
  popupClose.addEventListener('click', closePopup)
  popupOverlay.addEventListener('click', closePopup)
  
  window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('active')) {
        closePopup();
      }
  });
