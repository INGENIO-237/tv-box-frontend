const router = require("express").Router();

// Marketers
router.get("/marketers", (req, res) => {
  res.render("pages/admin/marketers", { layout: 'dashboard-layout.ejs' });
});

// Orders
router.get("/orders", (req, res) => {
  res.render("pages/admin/orders", { layout: 'dashboard-layout.ejs' });
});

// Payments
router.get("/payments", (req, res) => {
  res.render("pages/admin/payments", { layout: 'dashboard-layout.ejs' });
});

// Products
router.get("/products", (req, res) => {
  res.render("pages/admin/products", { layout: 'dashboard-layout.ejs' });
});

module.exports = router;
