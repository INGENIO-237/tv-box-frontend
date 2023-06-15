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
    .get(process.env.BACKEND_ENDPOINT + "/orders/" + req.params.id + "/sales")
    .then((response) => {
      const articles = response.data;
      res.render("pages/admin/order-details", {
        layout: "dashboard-layout.ejs",
        articles: articles,
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = { getOrders, getSingleOrder };
