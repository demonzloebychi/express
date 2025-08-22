const readMoreButtons = document.querySelectorAll(".js-read-more-btn");

readMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log('click')
    const textContainer = button.previousElementSibling;
    const isExpanded = textContainer.classList.toggle("expanded");
    button.classList.toggle("expanding");

    const spanInButton = button.querySelector('span')

    spanInButton.textContent = isExpanded ? "Свернуть" : "Читать полностью";
  });
});
