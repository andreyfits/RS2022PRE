let requirements = `Итоговая оценка: 85/85.
1. Смена изображений в секции portfolio +25
Изображения разных времён года получаем из папок с соответствующими названиями
Изображения заменены на другие с целью улучшения качества созданного приложения
  - при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием +20
  - кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными +5
2. Перевод страницы на два языка +25
Для перевода используется файл translate.js
  - при клике по надписи ru англоязычная страница переводится на русский язык +10
  - при клике по надписи en русскоязычная страница переводится на английский язык +10
  - надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем +5
3. Переключение светлой и тёмной темы +25
Внешний вид тёмной темы соответствует макету, который верстали в предыдущих частях задания, внешний вид светлой темы соответствует следующему варианту макета - блоки и секции header, hero, contacts, footer остались без изменений, в оставшихся секциях цвет фона и шрифта поменялись местами: фон стал белым, шрифт черным.
На страницу добавлен переключатель при клике по которому:
  - тёмная тема приложения сменяется светлой +10
  - светлая тема приложения сменяется тёмной +10
  - после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) +5
4. Дополнительный функционал: выбранный пользователем язык отображения страницы, набор изображений portfolio и тема сохраняются при перезагрузке страницы +5
5. Дополнительный функционал: эффект заполнения кнопок внутрь в секции portfolio при наведении +5
`;

console.log(requirements);

import variable from './js/variables.js';
import i18Obj from './js/translate.js';

/*======================================== LOCAL STORAGE ========================================*/
let timeOfYear = 'autumn';
let language = 'en';
let theme = 'dark';

const setLocalStorage = () => {
    localStorage.setItem('season', timeOfYear);
    localStorage.setItem('lang', language);
    localStorage.setItem('theme', theme);
};

const getLocalStorage = () => {
    if (localStorage.getItem('season') && localStorage.getItem('lang') && localStorage.getItem('theme')) {
        changeImage(localStorage.getItem('season'));
        getTranslate(localStorage.getItem('lang'));
        changeTheme(localStorage.getItem('theme'));
    } else {
        setLocalStorage();
        getLocalStorage();
    }

    variable['blackout'].style.display = 'flex';
};

window.addEventListener('load', getLocalStorage);
window.addEventListener('beforeunload', setLocalStorage);

/*======================================== TOGGLE MENU ========================================*/
function toggleMenu() {
    variable['toggle'].classList.toggle('open');
    variable['navMenu'].classList.toggle('open');
    variable['blackout'].classList.toggle('open');
    lightToDark();
}

function closeMenu(event) {
    if (event.target.classList.contains('nav-link')) {
        variable['toggle'].classList.remove('open');
        variable['navMenu'].classList.remove('open');
        variable['blackout'].classList.remove('open');
        lightToDark();
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

/*======================================== CHANGE THEME ========================================*/
const changeTheme = (color) => {
    (color === 'light')
        ? variable['data-theme'].forEach(element => element.classList.add('light'))
        : variable['data-theme'].forEach(element => element.classList.remove('light'));
    theme = color;
};

const changeThemeOnClick = (event) => {
    (event.target.classList.contains('light'))
        ? changeTheme('dark')
        : changeTheme('light');
};

function lightToDark() {
    if (variable['toggle'].classList.contains('light')) {
        variable['blackout'].classList.toggle('light');
        variable['skills-container'].classList.toggle('light');
        variable['portfolio-container'].classList.toggle('light');
        variable['section-title'].forEach(element => element.classList.toggle('light'));
        variable['portfolio-button'].forEach(element => element.classList.toggle('light'));
    }
}


/*======================================== CLICK EVENT ========================================*/
variable['navMenu'].addEventListener('click', closeMenu);
variable['switch-lang'].addEventListener('click', makeTranslate);
variable['theme-switch'].addEventListener('click', changeThemeOnClick);
variable['toggle'].addEventListener('click', toggleMenu);
variable['seasons'].forEach(element => preloadImages(element));
variable['portfolio-buttons'].addEventListener('click', changeImageEvent);
