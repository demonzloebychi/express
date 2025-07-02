//прелоудер был на сайте, ранее в общем файле main.js, но был закомментирован, он полностью согласован, но мешал разработке, выношу его в отдельный файл


const preloader = () => {

  const images = document.images;
  const images_total_count = images.length;
  let images_loaded_count = 0;

  const progress_bar = document.getElementById("progress");
  const preNum = document.getElementById("preloader-num");
  const preName = document.getElementById("preloader-name");

  // Функция для обновления прелоудера
  function updatePreloader() {
    // Обновляем прогресс-бар плавно
    progress_bar.style.width = `${(100 / 400) * images_loaded_count}%`;

    // Изменяем значения каждую секунду
    if (images_loaded_count === 100) {
      preNum.innerText = '02';
      preName.innerText = 'Продвижение';
    } else if (images_loaded_count === 200) {
      preNum.innerText = '03';
      preName.innerText = 'SEO';
    } else if (images_loaded_count === 300) {
      preNum.innerText = '04';
      preName.innerText = 'Дизайн';
    }

    images_loaded_count++;
  }

  // Запускаем обновление прелоудера каждые 10 мс
  const intervalId = setInterval(function() {
    updatePreloader();

    // Проверяем, достигли ли мы конца прелоудера
    if (images_loaded_count >= 400) {
      clearInterval(intervalId);
      setTimeout(function() {
        const preloader = document.getElementById("page-preloader");
        if (!preloader.classList.contains("done")) {
          preloader.classList.add("done");
        }
      }, 200);
    }
  }, 10); // Интервал в 10 мс

}

preloader()
