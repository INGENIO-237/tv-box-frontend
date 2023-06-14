const { checkLoggedIn } = require("../../middlewares/user-session");

const router = require("express").Router();

router.use(checkLoggedIn);

// Orders
router.get("/", (req, res) => {
  res.render("pages/admin/orders", { layout: 'dashboard-layout.ejs' });
});

module.exports = router;
