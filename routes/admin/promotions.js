const {
  getAllPromotions,
  getSinglePromotion,
  updatePromotion,
  createPromotion,
  deletePromotion,
} = require("../../controllers/admin/promotions");
const { checkLoggedIn } = require("../../middlewares/user-session");

const router = require("express").Router();

router.use(checkLoggedIn);

// Marketers
router.get("/", getAllPromotions);

router.post("/", createPromotion);

router.get("/:id", getSinglePromotion);

router.post("/:id", updatePromotion);

router.get("/delete/:id", deletePromotion);

module.exports = router;
