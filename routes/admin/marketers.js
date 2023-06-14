const {
  getAllMarketers,
  createMarketer,
  getSingleMarketer,
  updateMarketer,
  deleteMarketer,
} = require("../../controllers/admin/marketers");
const { checkLoggedIn } = require("../../middlewares/user-session");

const router = require("express").Router();

router.use(checkLoggedIn);

// Marketers
router.get("/", getAllMarketers);

router.post("/", createMarketer);

router.get("/:id", getSingleMarketer);

router.post("/:id", updateMarketer);

router.get("/delete/:id", deleteMarketer)

module.exports = router;
