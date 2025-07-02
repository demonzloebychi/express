//код для всех страниц, подключен в блоке connect.html, в конце, был изначально подключен инлайном, тк в прошлой версии( на сборщике) он нормально не отрабатывал через файл, исправил это


// Форма обратной связи: начало
document.addEventListener("DOMContentLoaded", function  () {
  const steps = document.querySelectorAll(".form-step");
  const backButton = document.getElementById("back");
  const nextButton = document.getElementById("next");
  const submitButton = document.getElementById("submit");
  const stepIndicators = document.querySelectorAll(".step");
  let currentStep = 0;
  const lastStep = steps.length - 1; // Индекс последнего шага


  document.querySelector('#number').onkeydown = function(e){
    inputphone(e,document.querySelector('#number'))
    }


    //Функция маски формат +7 (
    function inputphone(e, phone){
    function stop(evt) {
        evt.preventDefault();
    }
    let key = e.key, v = phone.value; not = key.replace(/([0-9])/, 1)

    if(not == 1 || 'Backspace' === not){
    if('Backspace' != not){
        if(v.length < 3 || v ===''){phone.value= '+7 ('}
        if(v.length === 7){phone.value= v +') '}
        if(v.length === 12){phone.value= v +'-'}
         if(v.length === 15){phone.value= v +'-'}
        }
    }else{stop(e)}  }


  // Load saved responses from local storage
  for (let i = 1; i <= 4; i++) {
    const savedValue = localStorage.getItem(`step${i}`);
    if (savedValue) {
        document.querySelector(`.form-step:nth-child(${i}) .option[data-value="${savedValue}"]`)?.classList.add("selected");
    }
  }

  function showStep(step) {
    steps.forEach((s, index) => {
        s.classList.toggle("active", index === step);
        stepIndicators[index].classList.toggle("active", index === step);

    });
    backButton.disabled = step === 0;
    nextButton.disabled = step === lastStep;
  }



  function saveResponse(step, value) {
    localStorage.setItem(`step${step}`, value);
  }

  document.querySelectorAll(".option").forEach(button => {
    button.addEventListener("click", function () {
        const step = this.dataset.step;
        const value = this.dataset.value;

        saveResponse(step, value);
        currentStep++;
        showStep(currentStep);
    });
  });

  backButton.addEventListener("click", function () {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
  });
  nextButton.addEventListener("click", function () {
    if (currentStep >= 0 && currentStep < lastStep) {
        currentStep++;
        showStep(currentStep);
    }
  });





  submitButton.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    localStorage.setItem("name", name);

    const number = document.getElementById("number").value;
    localStorage.setItem("number", number);

    const comments = document.getElementById("comments").value;
    localStorage.setItem("comments", comments);

    // alert("Ваши ответы сохранены!");
    localStorage.clear(); // Очистить local storage после отправки
    currentStep = 0;
    showStep(currentStep);
  });

  showStep(currentStep);
  });
// Форма обратной связи: конец
