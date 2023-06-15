const cartDetails = (req, res) => {
  res.render("pages/articles/checkout-details", {
    layout: "checkout-layout.ejs",
  });
};

const addToCart = (req, res) => {
  const { productId, name, quantity, price } = req.body;

  var cart = req.session.cart || {};

  cart[productId] = { name: name, quantity: quantity, price: price };

  req.session.cart = cart;

  const count = Object.keys(cart).length;

  console.log(req.session.cart);

  res.status(201).json({ count: count });
};

module.exports = { cartDetails, addToCart };
