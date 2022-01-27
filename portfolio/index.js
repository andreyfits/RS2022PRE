const toggle = document.querySelector('.toggle');
const navMenu = document.querySelector('nav');
const blackout = document.querySelector('body');

function toggleMenu() {
    toggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    blackout.classList.toggle('open');
}

toggle.addEventListener('click', toggleMenu)
navMenu.addEventListener('click', closeMenu)

function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) {
        toggle.classList.remove('open');
        navMenu.classList.remove('open');
        blackout.classList.remove('open');
    }
}
