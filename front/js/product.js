// récupération de l'Id
id = new URLSearchParams(window.location.search).get("id");

// liste des couleur en français
const colorTrad = [
  {
    color: "Red",
    couleur: "Rouge",
  },
  {
    color: "Yellow",
    couleur: "Jaune",
  },
  {
    color: "Black",
    couleur: "Noir",
  },
  {
    color: "White",
    couleur: "Blanc",
  },
  {
    color: "Grey",
    couleur: "Gris",
  },
  {
    color: "Silver",
    couleur: "Argent",
  },
  {
    color: "Brown",
    couleur: "Marron",
  },
  {
    color: "Orange",
    couleur: "Orange",
  },
  {
    color: "Navy",
    couleur: "Bleu Marine",
  },
  {
    color: "Green",
    couleur: "Vert",
  },
  {
    color: "Black/Yellow",
    couleur: "Noir/Jaune",
  },
  {
    color: "Black/Red",
    couleur: "Noir/Rouge",
  },
  {
    color: "Pink",
    couleur: "Rose",
  },
  {
    color: "Purple",
    couleur: "Violet",
  },
  {
    color: "Blue",
    couleur: "Bleu",
  },
];

// lien à l'API et affichage des données du produit
fetch(`http://localhost:3000/api/products/${id}`)
  .then((reponse) => reponse.json())

  .then((data) => {
    imgUrl = data.imageUrl;
    const imgSrc = document.querySelector(".item__img");
    imgSrc.innerHTML = `<img src="${imgUrl}" alt="Photographie d'un canapé" />`;
    const priceSrc = document.querySelector("#price");
    priceSrc.textContent = data.price;
    const descriptionData = document.querySelector("#description");
    descriptionData.textContent = data.description;

    let colorSelect = data.colors;
    // traduction des couleurs
    for (let i in colorSelect) {
      const optionData = document.createElement("option");
      let dataColor = colorSelect[i];
      for (let element of colorTrad) {
        if (dataColor == element.color) {
          dataColor = element.couleur;
        }
      }
      // affichage des options de couleur
      optionData.value = `${dataColor}`;
      optionData.textContent = `${dataColor}`;
      let optionSelect = document.querySelector("#colors");
      optionSelect.appendChild(optionData);
    }
  })
  .catch(function (err) {
    //une erreur est survenue
  });

// alimentation du localstorage au click du btn addToCart

document.querySelector("#addToCart").addEventListener("click", function () {
  let cartStorage = [];
  let colorValue = document.querySelector("#colors").value;
  let qtityValue = 0;
  qtityValue = document.querySelector("#quantity").value;

  // Vérification de la présence de la clé Cart dans LocalStorage
  if (localStorage.getItem("Cart") != undefined) {
    cartStorage = JSON.parse(localStorage.getItem("Cart"));
  }
  // Validation du choix de la couleur
  if (colorValue == "") {
    console.log("couleur non choisie");
    alert("Choississez la couleur du produit");
    return;
  }
  //  Validation de la quantité >1
  if (qtityValue < 1) {
    console.log("nombre < ou = à 0");
    alert("le nombre d'article ne peut être inférieur à 1");
    return;
  }
  // contrôle du localStorage key Cart si vide
  if (localStorage.getItem("Cart") == undefined) {
    cartStorage = [
      {
        _id: `${id}`,
        color: `${colorValue}`,
        quantity: `${qtityValue}`,
      },
    ];
    localStorage.setItem("Cart", JSON.stringify(cartStorage));
  } else {
    cartStorage = JSON.parse(localStorage.getItem("Cart"));
    console.log("chargement du cartstorage si non vide", cartStorage);

    // vérification de la présence ou non de l'article (id+couleur) dans le localstorage
    let resultId = [];
    resultId = cartStorage.filter((element) => {
      return element._id == `${id}` && element.color == `${colorValue}`;
    });

    console.log("resultat du filtre", resultId);

    if (resultId != "") {
      // récupération de l'index dans le cartStorage si article déjà présent
      const i = cartStorage
        .map(function (o) {
          return o._id + o.color;
        })
        .indexOf(id + colorValue);

      console.log("index du filtre", i);
      // récupération de la quantité de l'article en localStorage
      let q = 0;
      q = cartStorage[i].quantity;
      console.log("nbre d'article en localstorage = ", q);
      // suppression de la ligne de l'article
      cartStorage.splice(i, 1);
      console.log("nouveau cartstorage : ", cartStorage);
      // mise à jour de la quantité
      qtityValue = parseInt(qtityValue) + parseInt(q);
      console.log("nouvelle quantité", qtityValue);
      // ajout de l'article au même index qu'avant
      cartStorage.splice(i, 0, {
        _id: `${id}`,
        color: `${colorValue}`,
        quantity: `${qtityValue}`,
      });

      console.log(cartStorage);
      localStorage.setItem("Cart", JSON.stringify(cartStorage));
      return;
    } else {
      cartStorage[cartStorage.length] = {
        _id: `${id}`,
        color: `${colorValue}`,
        quantity: `${qtityValue}`,
      };
      localStorage.setItem("Cart", JSON.stringify(cartStorage));
    }
  }
  console.log(localStorage);
});
