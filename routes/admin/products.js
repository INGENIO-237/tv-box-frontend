const router = require("express").Router();
const axios = require("axios");
const { checkLoggedIn } = require("../../middlewares/user-session");
const {
  getAllProducts,
  createProduct,
} = require("../../controllers/admin/products");

router.use(checkLoggedIn);

// Products
router.get("/", getAllProducts);

router.post("/", createProduct);

router.get("/:id", (req, res) => {
  res.render("pages/admin/edit-product", { layout: "dashboard-layout.ejs" });
});

module.exports = router;
