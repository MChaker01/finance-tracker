const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

app.use("/api/user/", authRoutes);
app.use("/api/transaction/", transactionRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});
