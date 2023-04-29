const express = require("express");
const {
  createUser,
  loginUser,
  profile,
  updateProfile,
  getUsers,
} = require("../controllers/userController");
const { protect } = require("../middlewares/jwtMiddleware");

const router = express.Router();

//Create user
router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/profile", protect, profile);
router.put("/profile/update", protect, updateProfile);
router.get("/", getUsers);
module.exports = router;
