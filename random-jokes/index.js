const lang = document.querySelector('.lang');
const button = document.querySelector('.button');
const quote = document.querySelector('.quote');

const audio = new Audio;
audio.src = 'assets/audio/lion-roar.mp3';
audio.volume = 0.6;

const url = 'https://type.fit/api/quotes';

async function getQuotesEn() {
    const res = await fetch(url);
    const data = await res.json();
    showData(data);
}

function showData(data) {
    const rand = Math.floor(Math.random() * data.length);
    quote.textContent = data[rand].text;
}

async function getQuotesRu() {
    const quotes = './assets/json/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    showData(data);
}

const changeLangButtons = () => {
    lang.textContent = (lang.classList.contains('ru')) ? 'en' : 'ru';
    button.textContent = (lang.classList.contains('ru')) ? 'Дай же мне цитату!' : 'Give me the quote!';
}

const playAudio = () => {
    audio.play();
}

const getData = () => (lang.classList.contains('ru')) ? getQuotesRu() : getQuotesEn();

getData();

const getTranslate = () => {
    lang.classList.toggle('ru');
    getData();
    changeLangButtons();
}

lang.addEventListener('click', getTranslate);
lang.addEventListener('click', playAudio);
button.addEventListener('click', getData);
button.addEventListener('click', playAudio);
