const express = require("express");
const {
  create,
  getBooks,
  updateBook,
  deleteBook,
  singleBook,
} = require("../controllers/bookController");
const { protect } = require("../middlewares/jwtMiddleware");

const router = express.Router();

router.post("/", protect, create);
router.get("/", getBooks);
router.patch("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);
router.get("/:id",  singleBook);
module.exports = router;
