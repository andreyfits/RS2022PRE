let requirements = `Итоговая оценка: 25/85.
1. Смена изображений в секции portfolio +25
Изображения разных времён года получаем из папок с соответствующими названиями
Изображения заменены на другие с целью улучшения качества созданного приложения
  - при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
  - кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
`;

console.log(requirements);

import variable from './js/variables.js';
import i18Obj from './js/translate.js';

/*======================================== LOCAL STORAGE ========================================*/
let timeOfYear = 'autumn';
let language = 'en';

const setLocalStorage = () => {
    localStorage.setItem('season', timeOfYear);
    localStorage.setItem('lang', language);
};

const getLocalStorage = () => {
    if (localStorage.getItem('season') && localStorage.getItem('lang')) {
        changeImage(localStorage.getItem('season'));
        getTranslate(localStorage.getItem('lang'));
    } else {
        setLocalStorage();
        getLocalStorage();
    }
};

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

/*======================================== TOGGLE MENU ========================================*/
function toggleMenu() {
    variable['toggle'].classList.toggle('open');
    variable['navMenu'].classList.toggle('open');
    variable['blackout'].classList.toggle('open');
}

function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) {
        variable['toggle'].classList.remove('open');
        variable['navMenu'].classList.remove('open');
        variable['blackout'].classList.remove('open');
    }
}

/*============================== PORTFOLIO BUTTONS AND CHANGE IMAGES ==============================*/
const makeActive = (elements, value, data) => {
    elements.forEach(element => {
        element.classList.remove('active');
        if (element.dataset[data] === value) {
            element.classList.add('active');
        }
    });
};

const changeImage = (season) => {
    makeActive(variable['portfolio-button'], season, 'season');
    variable['portfolio-img'].forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`);
    timeOfYear = season;
};

const changeImageEvent = (event) => {
    if (event.target.classList.contains('portfolio-button')) {
        changeImage(event.target.dataset.season);
    }
};

/*======================================== CACHING IMAGES ========================================*/
const preloadImages = (season) => {
    for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `assets/img/${season}/${i}.jpg`;
    }
};

/*======================================== TRANSLATE PAGE ========================================*/
const getTranslate = (lang) => {
    variable['data-i18n'].forEach(element => element.textContent = i18Obj[lang][element.dataset.i18n]);
    variable['data-form'].forEach(element => element.placeholder = i18Obj[lang][element.dataset.form]);
    makeActive(variable['language'], lang, 'lang');
    language = lang;
};

const makeTranslate = (event) => {
    if (event.target.dataset.lang) {
        getTranslate(event.target.dataset.lang);
    }
};

/*======================================== CLICK EVENT ========================================*/
variable['navMenu'].addEventListener('click', closeMenu);
variable['switch-lang'].addEventListener('click', makeTranslate);
variable['toggle'].addEventListener('click', toggleMenu);
variable['seasons'].forEach(el => preloadImages(el));
variable['portfolio-buttons'].addEventListener('click', changeImageEvent);
