const formExpert = document.querySelector('.form-expert');
const formExpertSent = document.querySelector('.form-expert__sent')

formExpert.addEventListener('submit', async function (e) {
    e.preventDefault();
    formExpertSent.classList.add('active')
})