const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=4&api_key=17d94b92-754f-46eb-99a0-65be65b5d18f';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=17d94b92-754f-46eb-99a0-65be65b5d18f';
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=17d94b92-754f-46eb-99a0-65be65b5d18f`;

const SPAM_ERROR = document.getElementById('error');

const app = () => {
    loadRandomMichis();
    loadFavoriteMichis();
};

async function loadRandomMichis() {
    try{
        const response = await fetch(API_URL_RANDOM);
        if (!response.ok) {
            throw new Error(`Response error: ${response.status}`);
        } 
        const data = await response.json();
        console.log('RANDOM');
        console.log(data);
        
        const img1 = document.getElementById('foto1');
        const img2 = document.getElementById('foto2');
        const img3 = document.getElementById('foto3');
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        
        // const chk1 = document.getElementById('checkbo1');
        // const chk2 = document.getElementById('checkbo2');
        // const chk3 = document.getElementById('checkbo3');
        // chk1.checked = false;
        // chk2.checked = false;
        // chk3.checked = false;

        // chk1.onchange = () => chk2.checked ? saveFavoriteMichis(data[1].id) : retirarFavorites();
        // chk3.onchange = () => chk3.checked ? saveFavoriteMichis(data[2].id) : retirarFavorites();

    }catch (error){
        SPAM_ERROR.innerHTML = 'Hubo un error, ' + error.status + error.message;
        console.log(error); 
    }
}

// async function loadFavoriteMichis(){
//     try{
//         const response = await fetch(API_URL_FAVORITES);
//         const data = await response.json();
//         const img4 = document.getElementById('foto4');

        
//         if (!response.ok) {
//             throw new Error(`Response error: ${response.status}`);
//         } 
//         console.log('FAVORITES');
//         console.log(data);
//     }catch(error){
//         const errorMessage = `Hubo un error: ${error.status} ${error.message}`;
//         SPAM_ERROR.innerHTML = errorMessage;
//         console.log(errorMessage);
//     }
    
    
// }


        // if (data.length < 0) {
        //     img4.src = data[0].url;
        // } else {
        //     SPAM_ERROR.innerHTML = 'No se encontraron favoritos';
        // }

// async function saveFavoriteMichis() {
//     try{
//         const response = await fetch(API_URL_FAVORITES,{
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',  
//         },
//         body: JSON.stringify({
//             image_id: 'dje'
//         })
//     }) 
//     console.log('Saved')
//     console.log(response)

    
//     if (response.status !== 200) {
//         throw new Error(`Response error: ${response.status} ${response.message}`);
//     }else{
//         // const toRender = [];
//         // const section = document.getElementById('#favorites')
        
//         data.forEach(michi => {
//             console.log('aca')
//             const section = document.getElementById('favorites')
//             const art = document.createElement('article')
//             const img = document.createElement('img')
//             const btn = document.createElement('button')
//             const textBtn = document.createTextNode('Sacar Gato de favoritos')

//             img.src = michi.image.url
//             img.width = 150
//             btn.append(textBtn)
//             art.appendChild(img);
//             art.appendChild(btn);
//             // toRender.push(art)
//             section.appendChild(art)
//     });
//     // section.append(...toRender)
// }} catch(error){
//         console.log('Savelotodo')
//         const errorMessage = `Hubo un error: ${error.status} ${error.message}`;
//         SPAM_ERROR.innerHTML = errorMessage;
//         console.log(errorMessage);        
//     }

// };


async function saveFavoriteMichis(id) {
    const res = await fetch(API_URL_FAVORITES, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image_id: id
      }),
    });
    const data = await res.json();
  
    console.log('Save')
    console.log(res)
  
    if (res.status !== 200) {
        SPAM_ERROR.innerHTML = "Hubo un error: " + res.status + data.message;
    }
  }


  async function loadFavoriteMichis() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('Favoritos')
    console.log(data)
  
    if (res.status !== 200) {
        SPAM_ERROR.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
      data.forEach(michi => {
        const section = document.getElementById('favorites')
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
    }
  }


  async function deleteFavoritesMichis() {
    const res = await fetch(API_URL_FAVORITES_DELETE, {
        method: 'DELETE'
      });
      const data = await res.json();
    
      
      if (res.status !== 200) {
          SPAM_ERROR.innerHTML = "Hubo un error: " + res.status + data.message;
        } else {
        console.log('Deleteado el Michi')
        console.log(res)
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // tu código aquí
    app();
  });



