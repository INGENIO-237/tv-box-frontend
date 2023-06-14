const {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} = require("../../controllers/admin/users");
const { checkLoggedIn } = require("../../middlewares/user-session");

const router = require("express").Router();

router.use(checkLoggedIn);

// Marketers
router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/:id", getSingleUser);

router.post("/:id", updateUser);

router.get("/delete/:id", deleteUser);

module.exports = router;
