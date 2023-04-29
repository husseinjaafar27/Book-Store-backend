const Book = require("../models/Book");
const User = require("../models/User");

exports.create = async (req, res) => {
  try {
    const { category, author, title } = req.body;
    const user = await User.findById(req.user._id);

    const book = await Book.create({
      category: category,
      author: author,
      title: title,
      createdBy: user._id,
    });
    return res
      .status(200)
      .json({ message: "Book creating successfully", data: book });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("createdBy").sort("createdAt");
    if (!books) {
      return res.status(404).json({ message: "Books not found" });
    }
    return res.status(201).json(books);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await Book.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.singleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json(error);
  }
};
