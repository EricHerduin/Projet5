async function getProducts() {
  let url = "http://localhost:3000/api/products";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function renderProducts() {
  let products = await getProducts();
  let cardProduct = "";
  products.forEach((product) => {
    let productHtmlSegment = `<a href="./product.html?id=${product._id}" id="${product._id}">
                            <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}" >
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                        </a>`;

    cardProduct += productHtmlSegment;
  });

  let container = document.getElementById("items");
  container.innerHTML = cardProduct;
}

renderProducts();
