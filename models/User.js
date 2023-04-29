const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

//Popuplating this field of books to user s
UserSchema.virtual("books", {
  ref: "Book",
  foreignField: "createdBy",
  localField: "_id",
});
UserSchema.set("toJSON", { virtuals: true });

UserSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.passwordChanged = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return passwordChangedTime > JWTTimestamp;
  }
  return false;
};

module.exports = mongoose.model("User", UserSchema);
