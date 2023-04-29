const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const bookRoute = require("./routes/bookRoutes");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://book-store-backend-q9ak.onrender.com",
  })
);

app.use("/api/users", userRoute);
app.use("/api/books", bookRoute);

port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error connecting to database" + err));
