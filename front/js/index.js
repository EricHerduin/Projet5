async function main() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();
  renderProducts(products);
}
main();

async function renderProducts(products) {
  let cardProduct = "";
  products.forEach((product) => {
    const productHtmlSegment = `<a href="./product.html?id=${product._id}" id="${product._id}">
                            <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}" >
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                        </a>`;
    cardProduct += productHtmlSegment;
  });
  const container = document.getElementById("items");
  container.innerHTML = cardProduct;
}
