import productModel from "../models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, description, price, bestseller, category, subCategory, sizes } = req.body;

    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files[key]?.[0])
      .filter(Boolean);

    // Cloudinary stores file info in file.path
    const imagesUrl = images.map((file) => file.path);

    const productData = {
      name,
      description,
      sizes: JSON.parse(sizes || "[]"),
      price,
      bestseller: bestseller === "true",
      category,
      subCategory,
      images: imagesUrl,
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    await productModel.findByIdAndDelete(productId);
    res.json({ success: true, message: "Product removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export { addProduct, listProduct, removeProduct };