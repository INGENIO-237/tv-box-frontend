const axios = require("axios");
require("dotenv").config();

const getAllMarketers = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/users/roles/2")
    .then((response) => {
      const marketers = response.data;
      res.render("pages/admin/marketers", {
        layout: "dashboard-layout.ejs",
        marketers: marketers,
      });
    })
    .catch((error) => {
      console.error(error.response.data.message);
    });
};

const createMarketer = (req, res) => {
  const { name, fname, email, phone, password } = req.body;

  axios
    .post(process.env.BACKEND_ENDPOINT + "/account/register", {
      nom_usr: name,
      prenom_usr: fname,
      email_usr: email,
      mdp_usr: password,
      phone_usr: parseInt(phone),
    })
    .then((response) => {
      res.redirect("/marketers");
    })
    .catch((error) => {
      console.error(error.response);
    });
};

const getSingleMarketer = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/users/" + req.params.id)
    .then((response) => {
      const marketer = response.data;
      res.render("pages/admin/edit-marketer", {
        layout: "dashboard-layout.ejs",
        marketer: marketer,
      });
    });
};

const updateMarketer = (req, res) => {
  const { name, fname, email, phone } = req.body;

  axios
    .put(process.env.BACKEND_ENDPOINT + "/users/" + req.params.id, {
      nom_usr: name,
      prenom_usr: fname,
      phone_usr: phone,
      email_usr: email,
    })
    .then((response) => {
      res.redirect("/marketers");
    })
    .catch((error) => {
      console.error(error.response);
    });
};

const deleteMarketer = (req, res) => {
  axios
    .delete(process.env.BACKEND_ENDPOINT + "/users/" + req.params.id)
    .then((response) => {
        res.redirect("/marketers");
    })
    .catch((error) =>{
        console.error(error.response);
    })
};

module.exports = {
  getAllMarketers,
  createMarketer,
  getSingleMarketer,
  updateMarketer,
  deleteMarketer
};
