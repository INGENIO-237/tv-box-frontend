const router = require("express").Router();
const { checkLoggedIn } = require("../../middlewares/user-session");
const {
  getAllProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
} = require("../../controllers/admin/products");

// Multer storage engine
const storage = require("../../utils/image-storage");

// Package in charge of handling images
const multer = require("multer");
const upload = multer({ storage: storage });

router.use(checkLoggedIn);

// Products
router.get("/", getAllProducts);

router.post("/", upload.single("image"), createProduct);

router.get("/:id", getSingleProduct);

router.post("/:id", upload.single("image"), updateProduct);

module.exports = router;
