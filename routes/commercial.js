const {
  becomePartner,
  partnershipRequestList,
} = require("../controllers/commercial");

const router = require("express").Router();

// Commercials
router.get("/", (req, res) => {
  res.render("pages/commercial");
});

router.post("/", becomePartner);

router.get("/list", partnershipRequestList);

module.exports = router;
