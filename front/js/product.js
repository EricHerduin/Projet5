async function main() {
  document
    .querySelector("#addToCart")
    .addEventListener("click", handleAddToCart);
  const id = getProductId();
  const response = await fetch(`http://localhost:3000/api/products/${id}`);
  const product = await response.json();
  displayProductInformation(product);
  const colors = getTranslateColor(product.colors);
  displayColorsOption(colors);
}
main();

function getProductId() {
  return new URLSearchParams(window.location.search).get("id");
}

const colorTrad = {
  Red: "Rouge",
  Yellow: "Jaune",
  Black: "Noir",
  White: "Blanc",
  Grey: "Gris",
  Silver: "Argent",
  Brown: "Marron",
  Orange: "Orange",
  Navy: "Bleu Marine",
  Green: "Vert",
  Pink: "Rose",
  Purple: "Violet",
  Blue: "Bleu",
  "Black/Yellow": "Noir/Jaune",
  "Black/Red": "Noir/Rouge",
};
function getTranslateColor(colors) {
  return colors.map((color) => colorTrad[color]);
}

function displayColorsOption(colors) {
  for (let index in colors) {
    const optionData = document.createElement("option");
    const color = colors[index];
    optionData.value = `${color}`;
    optionData.textContent = `${color}`;
    const optionSelect = document.querySelector("#colors");
    optionSelect.appendChild(optionData);
  }
}

function displayProductInformation(product) {
  imgUrl = product.imageUrl;
  const imgSrc = document.querySelector(".item__img");
  imgSrc.innerHTML = `<img src="${imgUrl}" alt="Photographie d'un canapé" />`;
  const priceSrc = document.querySelector("#price");
  priceSrc.textContent = product.price;
  const descriptionData = document.querySelector("#description");
  descriptionData.textContent = product.description;
}

function handleAddToCart() {
  const cartStorage = getCartStorage();
  const form = getForm();
  if (form.color == "") {
    // Validation du choix de la couleur
    console.log("couleur non choisie");
    alert("Choississez la couleur du produit");
    return;
  }
  if (form.quantity < 1) {
    //  Validation de la quantité >1
    console.log("nombre < ou = à 0");
    alert("le nombre d'article ne peut être inférieur à 1");
    return;
  }
  updateCartStorage(cartStorage, form);
}

function getCartStorage() {
  const cartStorage = JSON.parse(localStorage.getItem("Cart"));
  if (!cartStorage) {
    return [];
  }
  return cartStorage;
}

function getForm() {
  const color = document.querySelector("#colors").value;
  const quantity = parseInt(document.querySelector("#quantity").value) ?? 0;
  return { color, quantity };
}

function updateCartStorage(cartStorage, form) {
  const cartProducts = cartStorage.filter((element) => {
    return element._id == getProductId() && element.color == form.color;
  });
  if (cartProducts.length > 0) {
    const cartProduct = cartProducts[0];
    const product = {
      ...cartProduct,
      quantity: cartProduct.quantity + form.quantity,
    };
    const index = cartStorage.indexOf(cartProduct);
    cartStorage[index] = product;
  } else {
    const product = { ...form, _id: getProductId() };
    cartStorage.push(product);
  }
  localStorage.setItem("Cart", JSON.stringify(cartStorage));
}
