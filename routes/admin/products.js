const router = require("express").Router();

// Products
router.get("/", (req, res) => {
  res.render("pages/admin/products", { layout: 'dashboard-layout.ejs' });
});

router.get("/:id", (req, res) => {
  res.render("pages/admin/edit-product", { layout: 'dashboard-layout.ejs' });
});

module.exports = router;
