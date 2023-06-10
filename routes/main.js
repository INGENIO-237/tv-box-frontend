const router = require("express").Router();

// Landing page
router.get("", (req, res) => {
  res.render("index");
});

// Packages
router.get("/packages", (req, res) => {
  res.render("pages/packages");
});

// Commercials
router.get("/commercial", (req, res) => {
  res.render("pages/commercial");
});

module.exports = router;
