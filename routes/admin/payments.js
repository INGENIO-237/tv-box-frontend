const router = require("express").Router();
// Payments
router.get("/", (req, res) => {
  res.render("pages/admin/payments", { layout: 'dashboard-layout.ejs' });
});

router.get("/:id", (req, res) => {
  res.render("pages/admin/payment-details", { layout: 'dashboard-layout.ejs' });
});

module.exports = router;
