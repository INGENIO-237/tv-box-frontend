const { loginUser, dashboard, logoutUser } = require("../controllers/auth");
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

// Profile
router.get("/profile", checkLoggedIn, (req, res) => {
  res.render("pages/auth/profile", { layout: "dashboard-layout.ejs" });
});

// Forgot password request
router.get("/forgot-password", (req, res) => {
  res.render("pages/auth/forgot-password", { layout: "auth-layout.ejs" });
});

module.exports = router;
