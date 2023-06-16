const axios = require("axios");
const formatDate = require("../../utils/format-date");

const getAllPayments = (req, res) => {
  axios.get(process.env.BACKEND_ENDPOINT + "/payments").then((response) => {
    const payments = response.data;

    payments.forEach((payment) => {
      payment.date_paie = formatDate(payment.date_paie);
    });
    res.render("pages/admin/payments", {
      layout: "dashboard-layout.ejs",
      payments: payments,
    });
  });
};

const getSinglePayment = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/payments/" + req.params.id)
    .then((response) => {
      const payment = response.data;

      axios
        .get(process.env.BACKEND_ENDPOINT + "/orders/" + payment.id_cmd + "/sales")
        .then((response) => {
          const sales = response.data;

          res.render("pages/admin/payment-details", {
            layout: "dashboard-layout.ejs",
            payment: payment,
            sales: sales,
          });
        });
    });
};

module.exports = { getAllPayments, getSinglePayment };
