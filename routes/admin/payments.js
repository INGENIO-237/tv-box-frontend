const { getAllPayments } = require("../../controllers/admin/payments");
const { checkLoggedIn } = require("../../middlewares/user-session");

const router = require("express").Router();

router.use(checkLoggedIn);

// Payments
router.get("/", getAllPayments);

router.get("/:id", (req, res) => {
  res.render("pages/admin/payment-details", { layout: "dashboard-layout.ejs" });
});

module.exports = router;
