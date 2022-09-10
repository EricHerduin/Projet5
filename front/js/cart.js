async function main() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  const ctrlcartStorage = JSON.parse(localStorage.getItem("Cart"));
  if (ctrlcartStorage == null) {
    console.log("panier vide");
    document.querySelector("#order").addEventListener("click", ctrlCartStorage);
    return;
  }
  const cartStorage = JSON.parse(localStorage.getItem("Cart"));
  displayHtml(cartStorage, products);
  const deleteBtn = document.querySelectorAll(".deleteItem");
  const inputQuantity = document.querySelectorAll(".itemQuantity");
  modifyQuantity(cartStorage, inputQuantity);
  deleteItem(deleteBtn, cartStorage);
  const form = document.querySelector("form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendOrder(cartStorage);
  });
}

main();

// ---> récupération de l'ID dans la BdD Products des produits du cart
function getIdData(products, id) {
  return products.findIndex((idData) => idData._id === id);
}

function displayCart(cartStorage, products) {
  let displayCartProduct = "";
  for (let index = 0; index < cartStorage.length; index++) {
    const idPositionProduct = getIdData(products, cartStorage[index]._id);
    displayCartProduct += `<article class="cart__item" products-id="${cartStorage[index]._id}" products-color="${cartStorage[index].color}">
  <div class="cart__item__img">
    <img src="${products[idPositionProduct].imageUrl}" alt="${products[idPositionProduct].altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${products[idPositionProduct].name}</h2>
      <p>${cartStorage[index].color}</p>
      <p>${products[idPositionProduct].price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartStorage[index].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
  </article>`;
  }
  return displayCartProduct;
}

function sumQuantity(cartStorage) {
  let sum = 0;
  for (let index = 0; index < cartStorage.length; index++) {
    sum += parseInt(cartStorage[index].quantity);
  }
  return sum;
}
function totalAmount(cartStorage, products) {
  let total = 0;
  for (let index = 0; index < cartStorage.length; index++) {
    const idPositionProduct = getIdData(products, cartStorage[index]._id);
    total +=
      parseInt(cartStorage[index].quantity) *
      parseInt(products[idPositionProduct].price);
  }
  return total;
}

function displayHtml(cartStorage, products) {
  document.querySelector("#cart__items").innerHTML = displayCart(
    cartStorage,
    products
  );
  document.querySelector("#totalQuantity").textContent = sumQuantity(
    cartStorage
  );
  document.querySelector("#totalPrice").textContent = totalAmount(
    cartStorage,
    products
  );
}

// Fonctions pour modification du Panier
function modifyQuantity(cartStorage, inputQuantity) {
  for (let index = 0; index < cartStorage.length; index++) {
    inputQuantity[index].addEventListener("change", (event) => {
      if (event.target.value <= 0 || event.target.value > 100) {
        alert("le nombre ne peut être inférieur à 1 ou supérieur à 100");
        return;
      } else {
        const newQuantity = event.target.value;
        const cartProduct = cartStorage[index];
        const product = {
          ...cartProduct,
          quantity: +parseInt(newQuantity),
        };
        cartStorage[index] = product;
        updateCart(cartStorage);
        return;
      }
    });
  }
}
function updateCart(cartStorage) {
  localStorage.setItem("Cart", JSON.stringify(cartStorage));
  main();
}
function deleteItem(deleteBtn, cartStorage) {
  if (deleteBtn.length < 1) {
    localStorage.removeItem("Cart");
    alert("votre panier est vide");
    main();
  }

  for (let index = 0; index < deleteBtn.length; index++) {
    deleteBtn[index].addEventListener("click", (event) => {
      event.preventDefault();
      cartStorage.splice(index, 1);
      updateCart(cartStorage);
    });
  }
}

// ***********  --> envoi de la commande et des coordonnées  **************

// --> validation du Format du champ Email
function ValidateEmail() {
  const form = getForm();
  const email = form.email.match(/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/);
  return email;
}
// /^([A-Za-z0-9_-.])+@ ([A-Za-z0-9_-.])+.([A-Za-z]{2,4})$/
//
function getForm() {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;
  return { firstName, lastName, address, city, email };
}

function custumerInfo() {
  const form = getForm();
  const contact = {
    firstName: form.firstName,
    lastName: form.lastName,
    address: form.address,
    city: form.city,
    email: form.email,
  };
  return contact;
}

function productOrder(cartStorage) {
  const arrayOrder = [];
  for (let index = 0; index < cartStorage.length; index++) {
    arrayOrder.push(cartStorage[index]._id);
  }
  return arrayOrder;
}

async function returnOrderId(contactCustumer, orderProduct) {
  const responsePost = await fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({
      contact: contactCustumer,
      products: orderProduct,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  const responseOrder = await responsePost.json();
  return responseOrder;
}

function ctrlCartStorage() {
  const cartStorage = JSON.parse(localStorage.getItem("Cart"));
  if (cartStorage == null) {
    return alert("votre panier est vide");
  }
}

function ctrlCustumerInfo() {
  const form = getForm();
  const ctrlLastName = /(\d+)/.test(form.lastName);
  const ctrlFirstName = /(\d+)/.test(form.firstName);
  if (ctrlFirstName == true || ctrlLastName == true) {
    return false;
  }
}

function ctrlCustumerCity() {
  const form = getForm();
  const ctrlZipCode = /^(\d+)$/.test(form.city.substr(0, 5));
  return ctrlZipCode;
}

async function sendOrder(cartStorage) {
  if (ctrlCustumerInfo() == false) {
    alert("veuillez vérifier votre nom et/ou prénom");
    return;
  }
  if (ctrlCustumerCity() == false) {
    alert("vérifiez le Code postal et la ville");
    return;
  }

  if (ValidateEmail() == false) {
    alert("vérifiez l'adresse mail");
    return;
  }
  const contactCustumer = custumerInfo();
  const orderProduct = productOrder(cartStorage);
  const responseOrder = await returnOrderId(contactCustumer, orderProduct);
  window.location.href =
    "http://127.0.0.1:5500/front/html/confirmation.html?orderId=" +
    `${responseOrder.orderId}`;
}
