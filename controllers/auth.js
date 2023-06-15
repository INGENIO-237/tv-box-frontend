const axios = require("axios");
require("dotenv").config();

// login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  axios
    .post(process.env.BACKEND_ENDPOINT + "/account/login", {
      email_usr: email,
      mdp_usr: password,
    })
    .then((response) => {
      //   Sets default common authorization header
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.token;

      // Gets current user and set session
      axios
        .get(process.env.BACKEND_ENDPOINT + "/account/current")
        .then((response) => {
          req.session.user = response.data;
          res.redirect("/account/dashboard");
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
      res.render("pages/auth/login", {
        layout: "auth-layout.ejs",
        error: error,
      });
    });
};

const dashboard = (req, res) => {
  res.render("pages/admin/dashboard-admin", {
    layout: "dashboard-layout.ejs",
  });
};

const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/account/login");
  });
};

module.exports = { loginUser, dashboard, logoutUser };
