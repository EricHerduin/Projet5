cartStorage = JSON.parse(localStorage.getItem("Cart"));

async function getProducts() {
  let url = "http://localhost:3000/api/products";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

indexCart = 0;
indexData = 0;

async function getIndexCart(a) {
  id = cartStorage[a]._id;
  color = cartStorage[a].color;
  quantity = cartStorage[a].quantity;
  console.log(id, color, quantity);
}

async function getIndexData(b) {
  let data = await getProducts();
  let i = data
    .map(function (o) {
      return o._id;
    })
    .indexOf(b._id);
  return i;
}

function panier() {
  cartStorage.forEach((product) => {
    getIndexCart(product);
    await getIndexData(product);
    console.log("data", i);
  });
}
panier();
getIndexCart(1);

//
//
// fonctionne mais ne renvoi rien 
Promise.all([getProducts(), cartLocalStorage()])
    .then(function (res) {
      data = res[0];
      cartStorage = res[1];
      console.log("le CartStorage = ", cartStorage);
      console.log("le data  ", data);
      return data, cartStorage;
    })
    .catch((error) => {
      console.log(error);
    });
    

    //
    //
    //



// cartStorage = JSON.parse(localStorage.getItem("Cart"));
// data = getProducts().then(new Response());
// // Fonction récupération de l'index de l'ID dans l'API
// async function getIndex(a) {
//   let data = await getProducts();
//   let i = data
//     .map(function (o) {
//       return o._id;
//     })
//     .indexOf(a._id);
//   return i;
// }

// // récupération des Index du data
// let r = cartStorage.forEach((product) => {
//   getIndex(product)
//     .then(function (res) {
//       i = res;
//       console.log("index i = ", i);
//       return res;
//     })
//     .then(function (r) {
//       return r;
//     });
// });
// console.log("r = ", r);

// async function returnCart() {
//   let data = await getProducts();
//   console.log(data);
//   console.log(cartStorage);

//   // function body() {}
// }
//
//
//
//
//
//
//
//
//
//
//

//----------------------------------------------------

// modification de la Quantité

// async function getIdData() {
//   let data = await getProducts();

//   cartStorage.forEach((product) => {
//     data
//       .map(function (o) {
//         return o._id;
//       })
//       .indexOf(product._id);
//   });
// }

// i = getIdData();
// console.log("l'index du produit dans la map Data est ", i);

// async function getIdCart() {
//   cartStorage.forEach((product) => {
//     cartStorage.indexOf(product._id);
//   });
// }

// let p = getIdData();

// console.log("l'index du produit dans la map Cart est ", p);

//----------------------------------------------------

// modifQuantity = document.querySelector(
//   "#cart__item__content__settings__quantity"
// );
// modifQuantity.addEventListener("click", changeQuantity, fasle);

// suppression d'un article

// let modifQuantity = document.querySelector(
//   "cart__item__content__settings__quantity"
// );
// if (modifQuantity != qtityValue) {
//   let q = 0;
//   q = cartStorage[i].quantity;
//   console.log("nbre d'article en localstorage = ", q);
//   // suppression de la ligne de l'article
//   cartStorage.splice(i, 1);
//   console.log("nouveau cartstorage : ", cartStorage);
//   // mise à jour de la quantité
//   qtityValue = parseInt(modifQuantity);
//   console.log("nouvelle quantité", qtityValue);
//   // ajout de l'article au même index qu'avant
//   cartStorage.splice(i, 0, {
//     _id: `${id}`,
//     color: `${colorValue}`,
//     quantity: `${qtityValue}`,
//   });

//   console.log(cartStorage);
//   localStorage.setItem("Cart", JSON.stringify(cartStorage));
// }
// let changeNbProduct = document.getElementById(
//   "#cart__item__content__settings__quantity"
// );
// changeNbProduct.addEventListener("change");




    // for (let j in inputQuantity) {
    //   j.addEventListener("input", function (event) {
    //     event.preventDefault();
    //     let nouvelleQuantity = event.tagert.value;
    //     console.log(nouvelleQuantity);
    //   });

    // inputQuantity[j].addEventListener("click", (event) => {
    //   event.preventDefault();
    //   console.log(inputQuantityArray);
    // });

    // // récupération des données du cart
    // cartStorage.splice(i, 1);
    // console.log("nouveau cartstorage : ", cartStorage);
    // // mise à jour de la quantité
    // qtityValue = parseInt(qtityValue) + parseInt(q);
    // console.log("nouvelle quantité", qtityValue);
    // // ajout de l'article au même index qu'avant
    // cartStorage.splice(i, 0, {
    //   _id: `${id}`,
    //   color: `${colorValue}`,
    //   quantity: `${qtityValue}`,
    // });
    // }
    // function changeQuantity() {
    //   alert("quantité changée");
    // }

    



    // function idValue() {
//   fetch("http://localhost:3000/api/request", {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//     },
//     function(aSelect) {
//       const choiceProduct = document.querySelector("#items > a");
//       const lenProduct = choiceProduct.length;
//       for (i = 0; i < lenProduct; i++) {
//         choiceProduct[i].addEventListener("click", function (e) {
//           const idd = e.currentTarget.id;
//           aSelect = idd;
//         });
//       }
//     },
//     body: JSON.stringify("_id", "${aSelect}"),
//   });
// }
// console.log(idValue);

// let choiceProduct = document.querySelector("#items > a");
// let lenProduct = choiceProduct.length;
// for (i = 0; i < lenProduct; i++) {
//   choiceProduct[i].addEventListener("click", function (e) {
//     const idd = e.currentTarget.id;
//   });

// }

// const imageUrl = "";
// const productName = "";
// const productDescription = "";

// class item {
//     constructor(imageUrl, productName, productDescription) {
//         this.imageUrl = imageUrl;
//         this.productName = productName;
//         this.productDescription = productDescription;
//     }
// }
// let allProducts = [];
// // variantes pour test
// // let firstItem = new item ("/back/images/kanap01.jpeg", "Canapé N°1", "test 1");
// // let secondItem = new item ("/back/images/kanap02.jpeg", "Canapé N°2", "test 2");
// // let thirdItem = new item ("/back/images/kanap03.jpeg", "Canapé N°3", "test 3");

// // push des articles test

// // allProducts.push(firstItem, secondItem, thirdItem);

// // Préparation du code pour response du serveur
// for (let i = 0; i < allProducts.length; i++) {
//     imageUrl = products.imageUrl;
//     productName = products.name;
//     productDescription = products.description;
//     let addItem = new item (imageUrl, productName, productDescription)
//     allProducts.push(addItem);
// }
// const nbAllProducts = allProducts.length;

// // création des vignettes items
// for (let i = 0; i < nbAllProducts; i++) {
// const newUrl = document.createElement("a");
// newUrl.setAttribute("href", "./product.html?id=42");
// const newArticle = document.createElement("article")
// const newImg = document.createElement("img");
// newImg.setAttribute("src", allProducts[i].imageUrl);
// const newProductName = document.createElement("h3");
// newProductName.classList.add("productName");
// newProductName.textContent = allProducts[i].productName;
// let newProductDescription = document.createElement("p");
// newProductDescription.classList.add("productDescription");
// newProductDescription.textContent = allProducts[i].productDescription;

// let Items = document.getElementById("items");
// Items.append(newUrl);
// newUrl.appendChild(newArticle);
// newArticle.appendChild(newImg);
// newArticle.appendChild(newProductName);
// newArticle.appendChild(newProductDescription);
// }

// // fetch("/back/models/Product.js")
// // .then((resp) => resp.json())
// // .then(function(data) {
// //   let totalCanape = data.results;
// //   return totalCanape.map(function(canape) {
// //     const newUrl = document.createElement("a");
// //     newUrl.setAttribute("href", "./product.html?id=42");
// //     const newArticle = document.createElement("article")
// //     const newImg = document.createElement("img");
// //     newImg.setAttribute("src", canape.imageUrl);
// //     const newProductName = document.createElement("h3");
// //     newProductName.classList.add("productName");
// //     newProductName.textContent = canape.productName;
// //     let newProductDescription = document.createElement("p");
// //     newProductDescription.classList.add("productDescription");
// //     newProductDescription.textContent = canape.productDescription;

// //     let Items = document.getElementById("items");
// //     Items.append(newUrl);
// //     newUrl.appendChild(newArticle);
// //     newArticle.appendChild(newImg);
// //     newArticle.appendChild(newProductName);
// //     newArticle.appendChild(newProductDescription);
// // })
// // });
