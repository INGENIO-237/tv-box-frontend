const axios = require("axios");

const getAllPayments = (req, res) => {
  axios.get(process.env.BACKEND_ENDPOINT + "/payments").then((response) => {
    const payments = response.data;
    res.render("pages/admin/payments", {
      layout: "dashboard-layout.ejs",
      payments: payments,
    });
  });
};

module.exports = { getAllPayments };
