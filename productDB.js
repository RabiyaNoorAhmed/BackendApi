require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/products");

const ProductJson = require("./products.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        await Product.deleteMany();  // Clear existing data if necessary
        await Product.create(ProductJson);
        console.log("Successfully imported products");
        process.exit(0);
    } catch (error) {
        console.error("Error importing products:", error);
        process.exit(1);
    }
};

start();
