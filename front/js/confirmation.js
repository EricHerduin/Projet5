orderNb = new URLSearchParams(window.location.search).get("orderId");

function validOrder() {
  document.getElementById("orderId").innerHTML = orderNb;
}

function deleteLocalStorage() {
  localStorage.clear();
}

validOrder();
deleteLocalStorage();
