const {
  getToSupport,
  createSupportRequest,
  getAllSupportRequests,
  getSingleSupportRequest,
} = require("../controllers/support");
const { checkLoggedIn } = require("../middlewares/user-session");

const router = require("express").Router();

// Support
router.get("/", getToSupport);

router.post("/", createSupportRequest);

router.get("/list", checkLoggedIn, getAllSupportRequests);

router.get("/:id", checkLoggedIn, getSingleSupportRequest);

module.exports = router;
