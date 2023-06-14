const router = require("express").Router();
require("dotenv").config();

// Checkout details
router.get("/", (req, res) => {
  res.render("pages/articles/checkout-details", { layout: "checkout-layout.ejs" });
});

// 
router.post("/", (req, res)=>{
  return redirect
})

// Checkout end
router.get("/payment", (req, res) => {
  res.render("pages/articles/checkout-end", { layout: "auth-layout.ejs", key: process.env.STRIPE_PUBLISHABLE_KEY, pay: {amount: 350, currency: "CAD"} });
});

module.exports = router;
