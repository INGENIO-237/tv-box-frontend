const axios = require("axios");
const formatDate = require("../../utils/format-date");

const getOrders = (req, res) => {
  axios.get(process.env.BACKEND_ENDPOINT + "/orders").then((response) => {
    const orders = response.data;

    orders.forEach((order) => {
      order.date_cmd = formatDate(order.date_cmd);
    });

    res.render("pages/admin/orders", {
      layout: "dashboard-layout.ejs",
      orders: orders,
    });
  });
};

const getSingleOrder = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/orders/" + req.params.id)
    .then((response) => {
      const order = response.data;

      order.date_cmd = formatDate(order.date_cmd);

      axios
        .get(
          process.env.BACKEND_ENDPOINT + "/orders/" + req.params.id + "/sales"
        )
        .then((response) => {
          const articles = response.data;

          let total = 0;
          articles.forEach((article) => {
            total += article.prix_art * article.qte;
          });

          res.render("pages/admin/order-details", {
            layout: "dashboard-layout.ejs",
            order: order,
            articles: articles,
            total: total,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

const updateOrderStatus = (req, res) => {
  axios
    .put(process.env.BACKEND_ENDPOINT + "/orders/" + req.params.id + "/status")
    .then((response) => {
      res.redirect("/orders/" + req.params.id);
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { getOrders, getSingleOrder, updateOrderStatus };
