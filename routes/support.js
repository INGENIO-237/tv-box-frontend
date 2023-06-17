const { getToSupport, createSupportRequest } = require("../controllers/support");

const router = require("express").Router();

// Support
router.get("/", getToSupport);

router.post("/", createSupportRequest);

module.exports = router;
