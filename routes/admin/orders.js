const { getOrders, getSingleOrder } = require("../../controllers/admin/orders");
const { checkLoggedIn } = require("../../middlewares/user-session");
require("dotenv").config();

const router = require("express").Router();

router.use(checkLoggedIn);

// Orders
router.get("/", getOrders);

router.get("/:id", getSingleOrder);

module.exports = router;
