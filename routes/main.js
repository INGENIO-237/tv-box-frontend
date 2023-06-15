const { renderIndex } = require("../controllers/main");

const router = require("express").Router();

// Landing page
router.get("", renderIndex);

// Packages
router.get("/packages", (req, res) => {
  res.render("pages/packages");
});

// Commercials
router.get("/commercial", (req, res) => {
  res.render("pages/commercial");
});

module.exports = router;
