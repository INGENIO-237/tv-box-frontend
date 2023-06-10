const router = require("express").Router();

// Commercials
router.get("/", (req, res) => {
  res.render("pages/commercial");
});

module.exports = router;
