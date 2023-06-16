const {
  getAllPayments,
  getSinglePayment,
} = require("../../controllers/admin/payments");
const { checkLoggedIn } = require("../../middlewares/user-session");

const router = require("express").Router();

router.use(checkLoggedIn);

// Payments
router.get("/", getAllPayments);

router.get("/:id", getSinglePayment);

module.exports = router;
