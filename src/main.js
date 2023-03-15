const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=4';




const app = () => {
    loadRandomMichis();
};

async function loadRandomMichis() {
    try{
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log(data);
        const img1 = document.getElementById('foto1');
        const img2 = document.getElementById('foto2');
        const img3 = document.getElementById('foto3');
        const img4 = document.getElementById('foto4');
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
    }catch (error){
        console.log(error);
    }
}

async function favoritesMichis(){
    try{
        

    }catch{

    }
}


app();
