const router = require("express").Router();

// Users
router.get("/", (req, res) => {
  res.render("pages/admin/users", { layout: 'dashboard-layout.ejs' });
});

router.get("/:id", (req, res) => {
  res.render("pages/admin/edit-user", { layout: 'dashboard-layout.ejs' });
});

module.exports = router;
