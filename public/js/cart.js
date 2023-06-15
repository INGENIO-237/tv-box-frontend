function addToCart(id) {
  var price = $("#" + id).data("price");
  var qty = $("#qty-" + id).val();
  var name = $("#name-" + id).data("name");

  if (qty > 0) {
    $.post("/cart/add", {
      productId: id,
      name: name,
      quantity: qty,
      price: price,
    }).done((data) => {
      console.log("data sent");
    });
  }
}
