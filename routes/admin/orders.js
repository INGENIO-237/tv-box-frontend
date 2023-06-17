const {
  getOrders,
  getSingleOrder,
  updateOrderStatus,
} = require("../../controllers/admin/orders");
const { checkLoggedIn } = require("../../middlewares/user-session");
require("dotenv").config();

const router = require("express").Router();

router.use(checkLoggedIn);

// Orders
router.get("/", getOrders);

router.get("/:id", getSingleOrder);

router.post("/:id/status", updateOrderStatus);

module.exports = router;
