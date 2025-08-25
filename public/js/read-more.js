const readMoreButtons = document.querySelectorAll(".js-read-more-btn");

readMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("click");
    const textContainer = button.previousElementSibling;
    const isExpanded = textContainer.classList.toggle("expanded");
    button.classList.toggle("expanding");

    const spanInButton = button.querySelector("span");

    const expandText = button.dataset.expandText || "Читать полностью";
    const collapseText = button.dataset.collapseText || "Свернуть";

    if (spanInButton) {
      spanInButton.textContent = isExpanded ? collapseText : expandText;
    } else {
      button.textContent = isExpanded ? collapseText : expandText;
    }
  });
});
