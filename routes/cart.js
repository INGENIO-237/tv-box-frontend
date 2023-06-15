const { addToCart, cartDetails } = require("../controllers/cart");

const router = require("express").Router();

// Checkout details
router.get("/", cartDetails);

router.post("/add", addToCart);

//
// router.post("/", (req, res)=>{
//   return redirect
// })

// Checkout end
router.get("/payment", (req, res) => {
  res.render("pages/articles/checkout-end", {
    layout: "auth-layout.ejs",
    key: process.env.STRIPE_PUBLISHABLE_KEY,
    pay: { amount: 350, currency: "CAD" },
  });
});

module.exports = router;
