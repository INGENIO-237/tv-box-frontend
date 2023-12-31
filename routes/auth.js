const {
  loginUser,
  dashboard,
  logoutUser,
  profile,
  forgotPassword,
  updateInfos,
  updateCredentials,
  resetPasswordPage,
  resetPasswordRequest,
  resetPassword,
} = require("../controllers/auth");
const dashboardMarketer = require("../controllers/marketer/dashboard");
const { checkLoggedIn } = require("../middlewares/user-session");

const router = require("express").Router();

// Login
router.get("/login", (req, res) => {
  res.render("pages/auth/login", {
    layout: "auth-layout.ejs",
    error: undefined,
  });
});

router.post("/login", loginUser);

// Logout
router.get("/logout", logoutUser);

// Dashboard
router.get("/dashboard", checkLoggedIn, dashboard);

// Dashboard Marketer
router.get("/dashboard-marketer", checkLoggedIn, dashboardMarketer);

// Profile
router.get("/profile", checkLoggedIn, profile);

// Forgot password request
router.get("/forgot-password", forgotPassword);

router.post("/forgot-password", resetPasswordRequest);

// Password reset
router.get("/password-reset/:token", resetPasswordPage);

router.post("/password-reset/:token", resetPassword);

// Update infos and credentials
router.post("/infos", updateInfos);

router.post("/credentials", updateCredentials);

module.exports = router;
