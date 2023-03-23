const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

const API_KEY = '17d94b92-754f-46eb-99a0-65be65b5d18f';

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
        SPAM_ERROR.innerHTML = 'Hubo un error CARGANDO RANDOM MICHIS, ' + error.status + error.message;
        console.log(error); 
    }
}


async function nuevoOguarda(){
  const checkbox1 = document.getElementById('checkbo1');
  const checkbox2 = document.getElementById('checkbo2');
  const checkbox3 = document.getElementById('checkbo3');

  console.log('Corregir esto')
  checkbox1.addEventListener('click', function() { this.checked ? saveFavoriteMichis('id') : loadRandomMichis();});
  checkbox2.addEventListener('click', function() { this.checked ? saveFavoriteMichis('id') : loadRandomMichis();});
  checkbox3.addEventListener('click', function() { this.checked ? saveFavoriteMichis('id') : loadRandomMichis();});

}


async function saveFavoriteMichis(id) {
    try {const res = await fetch(API_URL_FAVORITES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
      },
      body: JSON.stringify({
        image_id: id
      }),
    });

    const data = await res.json();
    console.log('Correct Save')
    console.log(res)
    loadFavoriteMichis();      
    } catch(error){
      SPAM_ERROR.innerHTML = 'Hubo un error GUARDANDO, ' + error.status + error.message;
      console.log(error)
    }
  }



  async function loadFavoriteMichis() {
    try{
      const res = await fetch(API_URL_FAVORITES, {
        method:'GET',
        headers: {
            'X-API-KEY': API_KEY
        }
      });
      const data = await res.json();
      console.log('Favoritos')
      console.log(data)

      const section = document.getElementById('favorites')
      section.innerHTML = "";
      const h2 = document.createElement('h2');
      const h2Text = document.createTextNode('Michis Favoritos');
      h2.appendChild(h2Text);
      section.appendChild(h2);

      data.forEach(michi => {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const btn = document.createElement('button');
        const btnText = document.createTextNode('Sacar al michi de favoritos');
  
        img.src = michi.image.url;
        img.width = 150;
        btn.appendChild(btnText);
        btn.onclick = () => deleteFavoritesMichis(michi.id);
        article.appendChild(img);
        article.appendChild(btn);
        section.appendChild(article);
      });
  } catch(error){
    SPAM_ERROR.innerHTML = 'Hubo un error CARGANDO FAVORITOS MICHIS, ' + error.status + error.message;
    console.log(error); 
  }
}


  async function deleteFavoritesMichis(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method: 'DELETE',
        headers:{
          'X-API-KEY': API_KEY
        }
      });
      const data = await res.json();
    
      
      if (res.status !== 200) {
          SPAM_ERROR.innerHTML = "Hubo un error: " + res.status + data.message;
        } else {
        console.log('Deleteado el Michi')
        console.log(res)
        loadFavoriteMichis();   
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // tu código aquí
    app();
  });



