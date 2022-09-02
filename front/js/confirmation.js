function insertOrderIdInTemplate(getOrderId) {
  document.getElementById("orderId").innerHTML = getOrderId;
}

function main() {
  const getOrderId = new URLSearchParams(window.location.search).get("orderId");
  insertOrderIdInTemplate(getOrderId);
  localStorage.removeItem("Cart");
}

main();
