const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4&api_key=17d94b92-754f-46eb-99a0-65be65b5d18f';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=17d94b92-754f-46eb-99a0-65be65b5d18f';

const SPAM_ERROR = document.getElementById('error');

const app = () => {
    loadRandomMichis();
    loadFavoriteMichis();
};

async function loadRandomMichis() {
    try{
        const response = await fetch(API_URL_RANDOM);
        const data = await response.json();
        console.log('RANDOM');
        console.log(data);

        const img1 = document.getElementById('foto1');
        const img2 = document.getElementById('foto2');
        const img3 = document.getElementById('foto3');
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        
    }catch (error){
        SPAM_ERROR.innerHTML = 'Hubo un error: ';
        console.log(error);
    }
}

async function loadFavoriteMichis(){
    try{
        const response = await fetch(API_URL_FAVORITES);
        const data = await response.json();
        const img4 = document.getElementById('foto4');

        
        if (!response.ok) {
            throw new Error(`Response error: ${response.status}`);
        } 
        console.log('FAVORITES');
        console.log(data);
    }catch(error){
        const errorMessage = `Hubo un error: ${error.status} ${error.message}`;
        SPAM_ERROR.innerHTML = errorMessage;
        console.log(errorMessage);
    }
    
    
}


        // if (data.length < 0) {
        //     img4.src = data[0].url;
        // } else {
        //     SPAM_ERROR.innerHTML = 'No se encontraron favoritos';
        // }

async function saveFavoriteMichis() {
    try{
        const response = await fetch(API_URL_FAVORITES,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  
        },
        body: JSON.stringify({
            image_id: 'dje'
        })
    }) 
    console.log('Saved')
    console.log(response)

    
    if (response.status !== 200) {
        throw new Error(`Response error: ${response.status} ${response.message}`);
    }else{
        // const toRender = [];
        // const section = document.getElementById('#favorites')
        
        data.forEach(michi => {
            console.log('aca')
            const section = document.getElementById('favorites')
            const art = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const textBtn = document.createTextNode('Sacar Gato de favoritos')

            img.src = michi.image.url
            img.width = 150
            btn.append(textBtn)
            art.appendChild(img);
            art.appendChild(btn);
            // toRender.push(art)
            section.appendChild(art)
    });
    // section.append(...toRender)
}}

catch(error){
        console.log('Savelotodo')
        const errorMessage = `Hubo un error: ${error.status} ${error.message}`;
        SPAM_ERROR.innerHTML = errorMessage;
        console.log(errorMessage);        
    }

};

app();



