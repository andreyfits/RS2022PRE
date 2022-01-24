console.log(
    "Вёрстка валидная +10\n" +
    "Вёрстка семантическая +20\n" +
    "Вёрстка соответствует макету +48\n" +
    "Требования к css + 12\n" +
    "Интерактивность, реализуемая через css +20\n"
)

const toggle = document.querySelector('.toggle');
const navMenu = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const show = document.querySelector('.show');

const toggleMenu = (event) => {
    toggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    show.classList.toggle('hide');
}

toggle.addEventListener('click', toggleMenu)

navLinks.forEach((element) => element.addEventListener('click', toggleMenu));