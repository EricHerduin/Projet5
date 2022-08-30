async function getProducts() {
  let url = "http://localhost:3000/api/products";
  try {
    let res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

async function cartStorage() {
  let url = "localStorage.getItem(`Cart`)";
  try {
    let res = await JSON.parse(url);
    return await res;
  } catch (error) {
    console.log(error);
  }
}
