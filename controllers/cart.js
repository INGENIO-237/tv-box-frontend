const axios = require("axios");
const formatDate = require("../utils/format-date");
require("dotenv").config();

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

  res.status(201).json({ count: count });
};

const saveBilling = (req, res) => {
  const { fName, name, address, email, promoCode, total } = req.body;

  let date = new Date();
  date = formatDate(date);

  const customer = {
    fname: fName,
    name: name,
    address: address,
    email: email,
    total: total,
    promotion: undefined,
    date: date,
  };

  if (promoCode) {
    axios
      .get(process.env.BACKEND_ENDPOINT + "/promotions/code/" + promoCode)
      .then((response) => {
        const promotion = response.data;
        customer.promotion = promotion;

        req.session.customer = customer;

        res.render("pages/articles/checkout-end", {
          layout: "auth-layout.ejs",
          key: process.env.STRIPE_PUBLISHABLE_KEY,
          customer: customer,
        });
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  } else {
    req.session.customer = customer;

    res.render("pages/articles/checkout-end", {
      layout: "auth-layout.ejs",
      key: process.env.STRIPE_PUBLISHABLE_KEY,
      customer: customer,
    });
  }
};

const performPayment = (req, res) => {
  const { stripeToken, stripeEmail } = req.body;
  const customer = req.session.customer;
  const cart = req.session.cart;

  // Create order
  axios
    .post(process.env.BACKEND_ENDPOINT + "/orders", {
      adresse_liv: customer.address,
      nom_complet_cli: customer.fname + " " + customer.name,
      email_cli: customer.email,
    })
    .then((response) => {
      const orderId = response.data.insertedId;

      // Create cart (sales)
      for (prop in cart) {
        axios
          .post(process.env.BACKEND_ENDPOINT + "/sales", {
            id_cmd: orderId,
            id_art: parseInt(prop),
            qte: parseInt(cart[prop].quantity),
          })
          .catch((error) => {
            console.error(error.response.data.message);
          });
      }

      // Perform payment
      let promo = undefined;
      if (customer.promotion) {
        promo = customer.promotion.code_prom;
      }
      axios
        .post(process.env.BACKEND_ENDPOINT + "/payments", {
          id_cmd: orderId,
          montant_paie: parseFloat(customer.total),
          code_promo: promo,
          email_cli: stripeEmail,
          nom_complet_cli: customer.fname + " " + customer.name,
          stripeToken: stripeToken,
        })
        .then((response) => {
          req.session.cart = {};
          res.status(200).json({ message: response.data.message });
        })
        .catch((error) => {
          for(prop in error) console.error(error[prop]);
        });
    });
};

module.exports = { cartDetails, addToCart, saveBilling, performPayment };
