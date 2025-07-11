// Установить cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Получить cookie
function getCookie(name) {
  let nameEQ = name + "=";
  let ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

// Показываем или скрываем popup
window.onload = function() {
  const popup = document.getElementById('cookieModal');
  const btn = document.getElementById('cookieAcceptBtn');
  if (!getCookie('cookieAccepted')) {
    popup.classList.remove('hidden');
  }
  btn.onclick = function() {
    setCookie('cookieAccepted', 'true', 365); // 1 год
    popup.classList.add('hidden');
  }
}
