const axios = require("axios");
const formatDate = require("../utils/format-date");
require("dotenv").config();

const getToSupport = (req, res) => {
  axios.get(process.env.BACKEND_ENDPOINT + "/objects").then((response) => {
    const objects = response.data;

    res.render("pages/support", { objects });
  });
};

const createSupportRequest = (req, res) => {
  const { name, fname, phone, address, object, date, description } = req.body;

  axios
    .post(process.env.BACKEND_ENDPOINT + "/requests", {
      id_obj: object,
      date_travaux: date,
      lieu_travaux: address,
      desc_travaux: description,
      nom_complet_cli_dmd: fname + " " + name,
      phone_cli_dmd: phone,
    })
    .then((response) => {
      res.redirect("/support");
    })
    .catch((error) => {
      res.render("pages/errors", {
        error: error.response.data.message,
      });
    });
};

const getAllSupportRequests = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/requests")
    .then((response) => {
      const supportRequests = response.data;

      supportRequests.forEach((supportRequest) => {
        supportRequest.date_dmd = formatDate(supportRequest.date_dmd);
        supportRequest.date_travaux = formatDate(supportRequest.date_travaux);
      });

      res.render("pages/admin/support-request", {
        layout: "dashboard-layout.ejs",
        supportRequests,
      });
    })
    .catch((error) => {
      res.render("pages/errors", {
        error: error.response.data.message,
      });
    });
};

const getSingleSupportRequest = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/requests/" + req.params.id)
    .then((response) => {
      const supportRequest = response.data;
      supportRequest.date_dmd = formatDate(supportRequest.date_dmd);
      supportRequest.date_travaux = formatDate(supportRequest.date_travaux);
      res.render("pages/admin/support-request-details", {
        layout: "dashboard-layout.ejs",
        supportRequest,
      });
    })
    .catch((error) => {
      res.render("pages/errors", {
        error: error.response.data.message,
      });
    });
};

module.exports = {
  getToSupport,
  createSupportRequest,
  getAllSupportRequests,
  getSingleSupportRequest,
};
