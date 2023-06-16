const {
  addToCart,
  cartDetails,
  saveBilling,
  performPayment,
} = require("../controllers/cart");

const router = require("express").Router();

// Checkout details
router.get("/", cartDetails);

router.post("/", saveBilling);

router.post("/add", addToCart);

router.post("/payment", performPayment);

module.exports = router;
