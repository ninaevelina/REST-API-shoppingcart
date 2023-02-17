require("dotenv").config();
const mongoose = require("mongoose");
const ProductData = require("./products");
const Product = require("../src/models/Product");

const populateDbWithData = async (connectionString) => {
  try {
    mongoose.set("strictQuery", false);

    const conn = await mongoose.connect(connectionString);

    console.log(`MongoDB connected: ${conn.connection.host}`);

    await Product.deleteMany();

    await Product.create(ProductData.products);

    console.log("Database successfully populated with test data");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
};

populateDbWithData(process.env.MONGO_CONNECTION_STRING);
