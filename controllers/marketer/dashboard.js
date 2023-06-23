const axios = require("axios");
const formatDate = require("../../utils/format-date");
const {
  getGainsOfTheMonthAmount,
  getTotalGainsAmount,
} = require("../../utils/sales");
require("dotenv").config();

const dashboardMarketer = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/users/promos/gains")
    .then((response) => {
      const gains = response.data;
      const gainsOfTheMonthAmount = getGainsOfTheMonthAmount(gains);
      const totalGainsAmount = getTotalGainsAmount(gains);

      gains.forEach((gain) => {
        gain.date_gain = formatDate(gain.date_gain);
      });

      res.render("pages/marketer/dashboard-com", {
        layout: "dashboard-layout.ejs",
        gains,
        totalGainsAmount,
        gainsOfTheMonthAmount
      });
    })
    .catch((error) => {
      res.render("pages/errors", {
        error: error.response.data.message,
      });
    });
};

module.exports = dashboardMarketer;
