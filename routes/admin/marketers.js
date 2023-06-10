const router = require("express").Router();

// Marketers
router.get("/", (req, res) => {
  res.render("pages/admin/marketers", { layout: "dashboard-layout.ejs" });
});

router.get("/:id", (req, res) => {
  res.render("pages/admin/edit-marketer", { layout: "dashboard-layout.ejs" });
});

module.exports = router;
