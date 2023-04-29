const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
};
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "Email is already used by another user." });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "invalid email address",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, password: hashedPassword });

    createSendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message:
          "The email address you entered is not connected to an account.",
      });
    }
    if (!(await user.checkPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    createSendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("books");
    res.status(404);
    if (!user) {
      return res
        .status(401)
        .json({ message: "You dont have any profile yet." });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    const updateUser = await user.save();
    return res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      password: updateUser.password,
      email: updateUser.email,
      token: signToken(updateUser._id),
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.getUsers = async (req, res) => {
  try {
    const user = await User.find().populate("books");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
