const reactionButtons = document.querySelectorAll(".a-blog-reaction__button");

const pathSegments = window.location.pathname.split('/')
const articleSlug = pathSegments[pathSegments.length -1] || pathSegments[pathSegments.length - 2];

const reactionKey = `reaction_for_${articleSlug}`

reactionButtons.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    reactionButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    localStorage.setItem(reactionKey, index);
  });
});

window.addEventListener('load', () => {
  const savedIndex = localStorage.getItem(reactionKey); 
  if (savedIndex !== null) {
    reactionButtons.forEach((btn, index) => {
      btn.classList.toggle('active', index == savedIndex); 
    });
  }
});
