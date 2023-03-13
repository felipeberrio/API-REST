const getGatos = () => {
    cargarFotosGato();
};

async function cargarFotosGato() {
    try{
        const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=3';
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        const img1 = document.getElementById('foto1');
        const img2 = document.getElementById('foto2');
        const img3 = document.getElementById('foto3');
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
    }catch (error){
        console.log(error);
    }
}

getGatos();
