
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_FAVORITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = `https://api.thecatapi.com/v1/images/upload`;
const API_KEY = "17d94b92-754f-46eb-99a0-65be65b5d18f";

const api = axios.create({
  baseURL: "https://api.thecatapi.com/v1/",
});

api.defaults.headers.common['X-API-KEY'] = API_KEY;


const SPAM_ERROR = document.getElementById("error");

const app = () => {
  loadRandomMichis();
  loadFavoriteMichis();
};

function addCheckboxListeners() {
  const checkbox1 = document.getElementById("checkbo1");
  checkbox1.addEventListener("click", function () {
    const img1 = document.getElementById("foto1");
    this.checked ? saveFavoriteMichis(img1.alt) : null;
  });

  const checkbox2 = document.getElementById("checkbo2");
  checkbox2.addEventListener("click", function () {
    const img2 = document.getElementById("foto2");
    this.checked ? saveFavoriteMichis(img2.alt) : null;
  });

  const checkbox3 = document.getElementById("checkbo3");
  checkbox3.addEventListener("click", function () {
    const img3 = document.getElementById("foto3");
    this.checked ? saveFavoriteMichis(img3.alt) : null;
  });
}

async function loadRandomMichis() {
  try {
    const response = await fetch(API_URL_RANDOM);
    const data = await response.json();
    console.log("RANDOM");
    console.log(data);

    const img1 = document.getElementById("foto1");
    const img2 = document.getElementById("foto2");
    const img3 = document.getElementById("foto3");
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img1.alt = data[0].id;
    img2.alt = data[1].id;
    img3.alt = data[2].id;
  } catch (error) {
    SPAM_ERROR.innerHTML =
      "Hubo un error CARGANDO RANDOM MICHIS, " + error.status + error.message;
    console.log(error);
  }
}

async function saveFavoriteMichis(id) {
  try {
    const res = await fetch(API_URL_FAVORITES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
      body: JSON.stringify({
        image_id: id,
      }),
    });

    const data = await res.json();
    console.log("Correct Save");
    console.log({ data });
    loadFavoriteMichis();
  } catch (error) {
    SPAM_ERROR.innerHTML =
      "Hubo un error GUARDANDO, " + error.status + error.message;
    console.log(error);
  }
}

async function loadFavoriteMichis() {
  try {
    const res = await fetch(API_URL_FAVORITES, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
      },
    });
    const data = await res.json();
    console.log("Favoritos");
    console.log(data);

    const section = document.getElementById("favorites");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Michis Favoritos");
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((michi) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar al michi de favoritos");

      img.src = michi.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavoritesMichis(michi.id);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  } catch (error) {
    SPAM_ERROR.innerHTML =
      "Hubo un error CARGANDO FAVORITOS MICHIS, " +
      error.status +
      error.message;
    console.log(error);
  }
}

async function deleteFavoritesMichis(id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id), {
    method: "DELETE",
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  const data = await res.json();

  if (res.status !== 200) {
    SPAM_ERROR.innerHTML = "Hubo un error: " + res.status + data.message;
    console.log({ data });
  } else {
    console.log("Deleteado el Michi");
    console.log(res);
    loadFavoriteMichis();
  }
}

async function uploadMichiPhoto() {
  try {
    const form = document.getElementById("uploadForm");
    const formData = new FormData(form);
    console.log(formData.get("file"));

    const res = await fetch(API_URL_UPLOAD, {
      method: "POST",
      headers: {
        // 'Content-Type': 'multipart/formdata',
        "X-API-KEY": API_KEY,
      },
      body: formData,
    });

    const data = await res.json();
    console.log("Foto de michi subida");
    console.log({ data });
    console.log(data.url);
    saveFavoriteMichis(data.id);
  } catch (error) {
    SPAM_ERROR.innerHTML =
      "Hubo un error GUARDANDO, " + error.status + error.message;
    console.log(error);
  }
}

const previewImage = () => {
  const file = document.getElementById("file").files;
  console.log(file);
  if (file.length > 0) {
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      document.getElementById("preview").setAttribute("src", e.target.result);
    };
    fileReader.readAsDataURL(file[0]);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // tu código aquí
  app();
  addCheckboxListeners();
});
