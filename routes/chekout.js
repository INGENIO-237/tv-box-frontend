const router = require("express").Router();

// Checkout details
router.get("/", (req, res) => {
  res.render("pages/articles/checkout-details", { layout: "checkout-layout.ejs" });
});

module.exports = router;
