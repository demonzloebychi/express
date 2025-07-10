 // Получаем все элементы с классом 'phones'
  const phoneInputs = document.querySelectorAll('.input__phone');

  // Для каждого элемента добавляем обработчик события keydown
  phoneInputs.forEach(phoneInput => {
    phoneInput.addEventListener('keydown', function(e) {
      inputphone(e, this); // Используем 'this' для передачи текущего элемента
    });
  });

  // Функция маски для телефона
  function inputphone(e, phone) {
    function stop(evt) {
      evt.preventDefault();
    }

    let key = e.key,
      v = phone.value;
    not = key.replace(/([0-9])/, 1);

    if (not == 1 || 'Backspace' === not) {
      if ('Backspace' != not) {
        if (v.length < 3 || v === '') {
          phone.value = '+7 (';
        }
        if (v.length === 7) {
          phone.value = v + ') ';
        }
        if (v.length === 12) {
          phone.value = v + '-';
        }
        if (v.length === 15) {
          phone.value = v + '-';
        }
      }
    } else {
      stop(e);
    }
  }

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
      // highlightEmptyFields();

      if (checkFields()) {
          popup.classList.add('active')
          popupOverlay.classList.add('active')
      } else {
          alert('Пожалуйста, заполните Обязательные поля!');
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





function checkCallFormFields() {
    const phoneInput = popupCall.querySelector('.popup-call__phone');
    const policyCheckbox = popupCall.querySelector('.checkbox-label .checkbox');
    const phoneFilled = phoneInput && phoneInput.value.trim() !== '';
    const checkboxChecked = policyCheckbox && policyCheckbox.checked;
    return phoneFilled && checkboxChecked;
}



const popupCall = document.querySelector('#popup-call');
const popupCallBtn = document.querySelectorAll('.popup-call-btn');
const popupCallSubmit = document.querySelector('#popup-call__submit')
const popupCallOverlay = document.querySelector('.popup-call__overlay')
const popupCallClose = document.querySelector('.popup-call__close')

const popupCallPhone = document.querySelectorAll('.popup-call__phone')

popupCallBtn.forEach(btn => {
    btn.addEventListener('click', function() {
        popupCall.classList.toggle('active');
        popupCallOverlay.classList.toggle('active');

    });
})

 

popupCallSubmit.addEventListener('click', function(e) {
    // e.preventDefault(); 
    // highlightEmptyFields();
    // popupCall.classList.remove('active')
    //     popupCallOverlay.classList.remove('active')
    //     popup.classList.add('active')
    //     popupOverlay.classList.add('active')


    if (checkCallFormFields()) {
        popupCall.classList.remove('active')
        popupCallOverlay.classList.remove('active')
        popup.classList.add('active')
        popupOverlay.classList.add('active')
    } else {
        alert('Пожалуйста, заполните Обязательные поля!');
    }
})


const closePopupCall = () => {
    popupCall.classList.remove('active')
    popupCallOverlay.classList.remove('active')
}
popupCallClose.addEventListener('click', closePopupCall)



