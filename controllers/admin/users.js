const axios = require("axios");
require("dotenv").config();

const getAllUsers = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/users/roles/1")
    .then((response) => {
      const users = response.data;
      res.render("pages/admin/users", {
        layout: "dashboard-layout.ejs",
        users: users,
      });
    })
    .catch((error) => {
      res.render("pages/errors", {
        error: error.response.data.message,
      });
    });
};

const createUser = (req, res) => {
  const { name, fname, email, phone, password } = req.body;

  axios
    .post(process.env.BACKEND_ENDPOINT + "/account/register", {
      id_role: 1,
      nom_usr: name,
      prenom_usr: fname,
      email_usr: email,
      mdp_usr: password,
      phone_usr: parseInt(phone),
    })
    .then((response) => {
      res.redirect("/users");
    })
    .catch((error) => {
      res.render("pages/errors", {
        error: error.response.data.message,
      });
    });
};

const getSingleUser = (req, res) => {
  axios
    .get(process.env.BACKEND_ENDPOINT + "/users/" + req.params.id)
    .then((response) => {
      const user = response.data;
      res.render("pages/admin/edit-user", {
        layout: "dashboard-layout.ejs",
        user: user,
      });
    });
};

const updateUser = (req, res) => {
  const { name, fname, email, phone } = req.body;

  axios
    .put(process.env.BACKEND_ENDPOINT + "/users/" + req.params.id, {
      nom_usr: name,
      prenom_usr: fname,
      phone_usr: phone,
      email_usr: email,
    })
    .then((response) => {
      res.redirect("/users");
    })
    .catch((error) => {
      res.render("pages/errors", {
          error: error.response.data.message,
        });
    });
};

const deleteUser = (req, res) => {
  axios
    .delete(process.env.BACKEND_ENDPOINT + "/users/" + req.params.id)
    .then((response) => {
      res.redirect("/users");
    })
    .catch((error) => {
      res.render("pages/errors", {
          error: error.response.data.message,
        });
    });
};

module.exports = {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
