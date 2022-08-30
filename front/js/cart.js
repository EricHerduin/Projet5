async function getProducts() {
  let url = "http://localhost:3000/api/products";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

// ---> récupération du LocalStorage
async function cartLocalStorage() {
  try {
    let res = JSON.parse(localStorage.getItem("Cart"));
    return res;
  } catch (error) {
    console.log(error);
  }
}

// ---> index des Id du Cart dans le Data
function getIdData(data, id) {
  let idPositionData = data.findIndex((idData) => idData._id === id);
  return idPositionData;
}

// -->  Fonctions pour calculs et intégration du Html
function cartHtml(product, data, idPositionData) {
  let cartHtmlSegment = `<article class="cart__item" data-id="${product._id}" data-color="${product.color}">
<div class="cart__item__img">
  <img src="${data[idPositionData].imageUrl}" alt="${data[idPositionData].altTxt}">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${data[idPositionData].name}</h2>
    <p>${product.color}</p>
    <p>${data[idPositionData].price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;
  return cartHtmlSegment;
}

function totalQuantity(a) {
  let totalProduct = 0;
  return (totalProduct += parseInt(a));
}

function totalAmount(a, b) {
  let totalAmountProduct = 0;
  return (totalAmountProduct += parseInt(a) * parseInt(b));
}

function integerHtml(cartProducts, totalNbProducts, totalAmountProducts) {
  document.querySelector("#cart__items").innerHTML = cartProducts;
  document.querySelector("#totalQuantity").textContent = totalNbProducts;
  document.querySelector("#totalPrice").textContent = totalAmountProducts;
}
function integerHtmlCart(data, product) {
  let idPositionData = getIdData(data, product._id);
  return cartHtml(product, data, idPositionData);
}
function integerHtmlNbProduct(product) {
  return totalQuantity(product.quantity);
}

function integerHtmlAmount(data, product) {
  let idPositionData = getIdData(data, product._id);
  return totalAmount(product.quantity, data[idPositionData].price);
}

// Fonctions pour modification du Panier
function deleteCartItem(cartStorage, line) {
  cartStorage.splice(line, 1);
  updateCart(cartStorage);
}

function updateCart(cartStorage) {
  localStorage.setItem("Cart", JSON.stringify(cartStorage));
  main();
}

function deleteItem(deleteBtn, cartStorage) {
  for (let k = 0; k < deleteBtn.length; k++) {
    deleteBtn[k].addEventListener("click", (event) => {
      event.preventDefault();
      deleteCartItem(cartStorage, k);
    });
  }
}

function modifyQuantity(cartStorage, inputQuantity) {
  for (let h = 0; h < cartStorage.length; h++) {
    inputQuantity[h].addEventListener("change", (event) => {
      if (event.target.value <= 0) {
        alert("le nombre ne peut être inférieur à 1");
        return;
      } else {
        let v = event.target.value;
        id = cartStorage[h]._id;
        color = cartStorage[h].color;
        cartStorage.splice(h, 0);
        cartStorage.splice(h, 1, {
          _id: `${id}`,
          color: `${color}`,
          quantity: `${v}`,
        });

        updateCart(cartStorage);
        return;
      }
    });
  }
}

// Fonction Main
async function main() {
  let cartProducts = "";
  let totalNbProducts = 0;
  let totalAmountProducts = 0;
  let cartStorage = await cartLocalStorage();
  let data = await getProducts();

  cartStorage.forEach((product) => {
    cartProducts += integerHtmlCart(data, product);
    totalNbProducts += integerHtmlNbProduct(product);
    totalAmountProducts += integerHtmlAmount(data, product);
  });
  integerHtml(cartProducts, totalNbProducts, totalAmountProducts);
  const deleteBtn = document.querySelectorAll(".deleteItem");
  const inputQuantity = document.querySelectorAll(".itemQuantity");
  modifyQuantity(cartStorage, inputQuantity);
  deleteItem(deleteBtn, cartStorage);
}
main();

// ***********  --> envoi de la commande et des coordonées  **************

// --> validation du Format du champ Email
function ValidateEmail() {
  email = document.querySelector("#email");
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
    return true;
  }
  alert("Vous avez entré une adresse mail invalide. Merci de vérifier !");
  return false;
}

function custumerInfo() {
  const form = document.querySelectorAll(".cart__order__form input");
  let arrayForm = [];
  let contact = "";
  form.forEach((input) => {
    arrayForm.push(input.value);
    contact = {
      firstName: `${arrayForm[0]}`,
      lastName: `${arrayForm[1]}`,
      address: `${arrayForm[2]}`,
      city: `${arrayForm[3]}`,
      email: `${arrayForm[4]}`,
    };
  });
  return contact;
}

//voir avec Dylan pour les promesses
// est-ce la bonne méthode ?
function productOrder() {
  const arrayOrder = []; // est-ce utile de déclarer une varialbe sachant qu'il y a un return
  cartLocalStorage().then((value) => {
    for (let i = 0; i < value.length; i++) {
      arrayOrder.push(value[i]._id);
    }
  });
  // console.log(arrayOrder);
  return arrayOrder;
}

function sendOrder() {
  orderBtn = document.querySelector("#order");
  dataOrder = [];
  orderBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let contactCustumer = "";
    let orderProduct = [];
    ValidateEmail();
    if (ValidateEmail() == false) {
      return;
    }
    contactCustumer = custumerInfo();
    orderProduct = productOrder();
    // return; // si besoin d'arrêter la fonction
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({
        contact: contactCustumer,
        products: orderProduct,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        window.location.href =
          "http://127.0.0.1:5500/front/html/confirmation.html?orderId=" +
          `${data.orderId}`;
      })
      .catch((error) => console.error("Error", error));
  });
}
sendOrder();
// --> Création du array id Product pour order

// function orderArray() {
//   class idArrayClass {
//     constructor(_id) {
//       this._id = _id;
//     }
//   }
//   cartStorage.forEach((product) => {
//     let idTab = new idArrayClass(product._id);
//     idArray.push(idTab);
//   });
// }

// -> récupération des données contact client

// infos = [];
// class infosClass {
//   constructor(infos) {
//     this.infos = infos;
//   }
// }

// const form = document.querySelectorAll(".cart__order__form input");
// function InfoCostumer() {
//   console.log(form.length);

//   const length = 5;
//   for (let n = 0; n <= length; n++) {
//     form[n].addEventListener("input", (event) => {
//       event.preventDefault();
//       let infosTab = new infosClass(event.target.value);
//       infos.push(infosTab);
//     });
//   }
//   console.log(infos);
// }

// form.forEach((input) => {
//   console.log(input);
// });
// let firstName = document.querySelector("#firstname").value;
// let lastName = document.querySelector("#lastname").value;
// let adress = document.querySelector("#adress").value;
// let city = document.querySelector("#city").value;
// let email = document.querySelector("#email").value;
// let contact = {
//   firstName: `${firstName}`,
//   lastName: `${lastName}`,
//   address: `${adress}`,
//   city: `${city}`,
//   email: `${email}`,
// };

// if (
//   orderBtn.addEventListener("click", (event) => {
//     event.preventDefault();
//     cartStorage = JSON.parse(localStorage.getItem("Cart"));
//     ValidateEmail();
//     let idArray = [];
//     orderArray();
//     console.table(idArray);
//     infos = [];
//     InfoCostumer();
//   })
// );
// class order {
//   constructor(a, b) {
//     this._id = a;
//     this.color = b;
//   }
// }

// cartStorage.forEach((product) => {
//   let p = product._id;
//   let s = product.color;
//   console.log(p + " " + s);
//   orderArray = [
//     {
//       _id: `${p}`,
//       color: `${s}`,
//     },
//   ];
// });
// console.log("bon de commande", orderArray);

// form = document.querySelector(".cart__order__form");
// const r = form.length;

// console.log(form);
// console.log(form.length);

/**
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
