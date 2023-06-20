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

          if (req.session.user.id_role == 1) {
            res.redirect("/account/dashboard");
          } else {
            res.redirect("/account/dashboard-marketer");
          }
        })
        .catch((error) => {
          res.render("pages/auth/login", {
            layout: "auth-layout.ejs",
            error: error.response.data.message,
          });
        });
    })
    .catch((error) => {
      res.render("pages/auth/login", {
        layout: "auth-layout.ejs",
        error: error.response.data.message,
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

const profile = (req, res) => {
  res.render("pages/auth/profile", { layout: "dashboard-layout.ejs" });
};

const forgotPassword = (req, res) => {
  res.render("pages/auth/forgot-password", { layout: "auth-layout.ejs" });
};

const resetPasswordRequest = (req, res) => {
  const { email } = req.body;

  axios
    .post(process.env.BACKEND_ENDPOINT + "/account/forgot-password", {
      email_usr: email,
    })
    .then((response) => {
      res.json({
        message: `An email has been sent to you (${email}). Check your inbox.`,
      });
    })
    .catch((error) => {
      res.render("pages/auth/login", {
        layout: "auth-layout.ejs",
        error: error.response.data.message,
      });
    });
};

const resetPasswordPage = (req, res) => {
  res.render("pages/auth/reset-password", { layout: "auth-layout-2.ejs" });
};

const resetPassword = (req, res) => {
  const { newPassword } = req.body;

  axios
    .post(
      process.env.BACKEND_ENDPOINT + "/account/password-reset/" + req.params.token,
      {
        new_mdp: newPassword,
      }
    )
    .then((response) => {
      res.redirect("/account/login");
    })
    .catch((error) => {
      res.render("pages/auth/login", {
        layout: "auth-layout.ejs",
        error: error.response.data.message,
      });
    });
};

const updateInfos = (req, res) => {
  const { email, name, fName, phone } = req.body;

  axios
    .put(process.env.BACKEND_ENDPOINT + "/users/" + req.session.user.id_usr, {
      email_usr: email,
      nom_usr: name,
      prenom_usr: fName,
      phone_usr: phone,
    })
    .then((response) => {
      res.redirect("/account/logout");
    })
    .catch((error) => {
      res.render("pages/auth/login", {
        layout: "auth-layout.ejs",
        error: error.response.data.message,
      });
    });
};

const updateCredentials = (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  axios
    .put(process.env.BACKEND_ENDPOINT + "/account/update-credentials", {
      new_email_usr: email,
      old_mdp_usr: oldPassword,
      new_mdp_usr: newPassword,
    })
    .then((response) => {
      res.redirect("/account/logout");
    })
    .catch((error) => {
      res.render("pages/auth/login", {
        layout: "auth-layout.ejs",
        error: error.response.data.message,
      });
    });
};

module.exports = {
  loginUser,
  dashboard,
  logoutUser,
  profile,
  forgotPassword,
  resetPasswordPage,
  resetPasswordRequest,
  resetPassword,
  updateInfos,
  updateCredentials,
};
