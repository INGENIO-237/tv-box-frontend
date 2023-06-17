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
      $("#cart-count").text(data.count);
    });
  }
}

function increase(id) {
  let qty = parseInt($("#qty-" + id).text());
  $("#qty-" + id).text(qty + 1);
}

function decrease(id) {
  let qty = parseInt($("#qty-" + id).text());
  if (qty > 0) $("#qty-" + id).text(qty - 1);
}
