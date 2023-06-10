const router = require("express").Router();

// Login
router.get("/login", (req, res) => {
  res.render("pages/auth/login", { layout: "auth-layout.ejs" });
});

// Dashboard
router.get("/dashboard", (req, res) => {
  res.render("pages/admin/dashboard-admin", { layout: "dashboard-layout.ejs" });
});

// Profile
router.get("/profile", (req, res) => {
  res.render("pages/auth/profile", { layout: "dashboard-layout.ejs" });
});

// Forgot password request
router.get("/forgot-password", (req, res) => {
  res.render("pages/auth/forgot-password", { layout: "auth-layout.ejs" });
});

module.exports = router;
