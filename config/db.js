const mongoose = require("mongoose");

const conntectDB = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URI)
      .then(console.log("MongoDB connected Successfully."));
  } catch (error) {
    console.error("Error while Connecting to MongoDB.", error);
    process.exit(1);
  }
};

module.exports = conntectDB;
