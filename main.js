console.log('Hola todos')


// const URL = 'http://shibe.online/api/shibes?count=[1-100]&urls=[true/false]&httpsUrls=[true/false]';
const URL = 'https://api.thecatapi.com/v1/images/search';

fetch(URL)
    .then(response => response.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    })