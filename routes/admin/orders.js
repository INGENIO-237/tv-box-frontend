const router = require("express").Router();

// Orders
router.get("/", (req, res) => {
  res.render("pages/admin/orders", { layout: 'dashboard-layout.ejs' });
});

module.exports = router;
