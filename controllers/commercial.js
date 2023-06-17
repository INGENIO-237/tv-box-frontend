const axios = require("axios");
const { request } = require("express");
const formatDate = require("../utils/format-date");
require("dotenv").config();

const becomePartner = (req, res) => {
  const { nom, prenom, email, phone } = req.body;

  axios
    .post(process.env.BACKEND_ENDPOINT + "/partners", {
      nom: nom,
      prenom: prenom,
      email: email,
      phone: phone,
    })
    .then((response) => {
      res.redirect("/commercials");
    })
    .catch((error) => {
      console.error(error.response.data.message);
    });
};

const partnershipRequestList = (req, res) => {
  axios.get(process.env.BACKEND_ENDPOINT + "/partners").then((response) => {
    const requests = response.data;

    requests.forEach((request) => {
      request.date_envoi = formatDate(request.date_envoi);
    });
    res.render("pages/admin/partnership", {
      layout: "dashboard-layout.ejs",
      requests: requests,
    });
  });
};

module.exports = { becomePartner, partnershipRequestList };
