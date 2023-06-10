const router = require("express").Router();

// Promotions
router.get("/", (req, res) => {
  res.render("pages/admin/promotions", { layout: 'dashboard-layout.ejs' });
});

router.get("/:id", (req, res) => {
  res.render("pages/admin/edit-promotion", { layout: 'dashboard-layout.ejs' });
});

module.exports = router;
