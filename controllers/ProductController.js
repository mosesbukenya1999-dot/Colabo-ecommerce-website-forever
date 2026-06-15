// import productModel from "../models/productModel.js";
// import sellerApplicationModel from "../models/sellerApplicationModel.js";

// // -------------------- ADMIN ADD PRODUCT --------------------
// /* const addProduct = async (req, res) => {
//   try {
//     const { name, description, price, bestseller, category, subCategory, sizes, brand, discount } = req.body;

//     const images = ["image1", "image2", "image3", "image4"]
//       .map((key) => req.files[key]?.[0])
//       .filter(Boolean);

//     const imagesUrl = images.map((file) => file.path);

//     const productData = {
//       name,
//       description,
//       sizes: JSON.parse(sizes || "[]"),
//       price,
//       bestseller: bestseller === "true",
//       category,
//       subCategory,
//       images: imagesUrl,
//       brand,
//       discount,
//       sellerApplicationId: null, // admin products have no seller
//       status: "approved",
//     };

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product added successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// }; */

// const addProduct = async (req, res) => {
//   try {
//     const { name, description, variants, bestseller, category, subCategory, brand, discount } = req.body;

//     const images = ["image1", "image2", "image3", "image4"]
//       .map((key) => req.files[key]?.[0])
//       .filter(Boolean);

//     const imagesUrl = images.map((file) => file.path);

//     // Parse variants if sent as JSON string
//     const parsedVariants = JSON.parse(variants || "[]");

//     const productData = {
//       name,
//       description,
//       variants: parsedVariants,
//       bestseller: bestseller === "true",
//       category,
//       subCategory,
//       images: imagesUrl,
//       brand,
//       discount: Number(discount) || 0,
//       sellerApplicationId: null,
//       status: "approved",
//     };

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product added successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- LIST ALL PRODUCTS --------------------
// const listProduct = async (req, res) => {
//   try {
//     const products = await productModel.find({  })
//       .populate("sellerApplicationId"); // populate real seller data

//     res.json({ success: true, products });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- REMOVE PRODUCT (ADMIN) --------------------
// const removeProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     await productModel.findByIdAndDelete(productId);
//     res.json({ success: true, message: "Product removed" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- SELLER ADD PRODUCT --------------------
// const addSellerProduct = async (req, res) => {
//   try {
//     // Find seller's approved application
//     const sellerApplication = await sellerApplicationModel.findOne({
//       userId: req.user.id,
//       status: "approved",
//     });

//     if (!sellerApplication) {
//       return res.json({
//         success: false,
//         message: "No approved seller account found",
//       });
//     }

//     const { name, description, price, category, subCategory, sizes, brand, discount } = req.body;

//     const images = ["image1", "image2", "image3", "image4"]
//       .map((key) => req.files[key]?.[0])
//       .filter(Boolean);

//     const imagesUrl = images.map((file) => file.path);

//     const productData = {
//       name,
//       description,
//       sizes: JSON.parse(sizes || "[]"),
//       price,
//       category,
//       subCategory,
//       images: imagesUrl,
//       brand,
//       discount,
//       sellerApplicationId: sellerApplication._id, // link to seller application
//       status: "pending", // needs admin approval
//     };

//     const product = new productModel(productData);
//     await product.save();

//     res.json({ success: true, message: "Product submitted for approval" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- GET SELLER'S PRODUCTS --------------------
// const sellerProducts = async (req, res) => {
//   try {
//     const sellerApplication = await sellerApplicationModel.findOne({
//       userId: req.user.id,
//       status: "approved",
//     });

//     if (!sellerApplication) {
//       return res.json({ success: false, message: "No approved seller account found" });
//     }

//     const products = await productModel.find({
//       sellerApplicationId: sellerApplication._id,
//     });

//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- SELLER REMOVE PRODUCT --------------------
// const sellerRemoveProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;

//     const product = await productModel.findById(productId);

//     if (!product) return res.json({ success: false, message: "Product not found" });

//     const sellerApplication = await sellerApplicationModel.findOne({
//       userId: req.user.id,
//       status: "approved",
//     });

//     if (!sellerApplication || product.sellerApplicationId.toString() !== sellerApplication._id.toString()) {
//       return res.json({ success: false, message: "You are not allowed to delete this product" });
//     }

//     await productModel.findByIdAndDelete(productId);
//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- PENDING PRODUCTS (ADMIN) --------------------
// const getPendingProducts = async (req, res) => {
//   try {
//     const products = await productModel.find({ status: "pending" })
//       .populate("sellerApplicationId");
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // -------------------- APPROVE / REJECT PRODUCTS --------------------
// const approveProduct = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const product = await productModel.findById(productId);
//     if (!product) return res.json({ success: false, message: "Product not found" });

//     product.status = "approved";
//     product.rejectionReason = "";
//     await product.save();

//     res.json({ success: true, message: "Product approved" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// const rejectProduct = async (req, res) => {
//   try {
//     const { productId, reason } = req.body;
//     const product = await productModel.findById(productId);
//     if (!product) return res.json({ success: false, message: "Product not found" });

//     product.status = "rejected";
//     product.rejectionReason = reason;
//     await product.save();

//     res.json({ success: true, message: "Product rejected" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export {
//   addProduct,
//   listProduct,
//   removeProduct,
//   addSellerProduct,
//   sellerProducts,
//   sellerRemoveProduct,
//   getPendingProducts,
//   approveProduct,
//   rejectProduct,
// };

import productModel from "../models/productModel.js";
import sellerApplicationModel from "../models/sellerApplicationModel.js";

// -------------------- ADMIN ADD PRODUCT --------------------
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      variants,
      bestseller,
      category,
      subCategory,
      brand,
      discount,
    } = req.body;


    console.log("BODY:", req.body);
console.log("FILES:", req.files);
console.log("USER:", req.user);
    // Handle images upload (optional multiple images)
    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files?.[key]?.[0])
      .filter(Boolean);

    const imagesUrl = images.map((file) => file.path);

    // Parse variants safely
    let parsedVariants = [];

try {
  
  if (variants && typeof variants === "string") {
    parsedVariants = JSON.parse(variants);
  } else if (Array.isArray(variants)) {
    parsedVariants = variants;
  } else {
    parsedVariants = [];
  }
} catch (err) {
  console.log("Variants error:", variants);
  return res.status(400).json({
    success: false,
    message: "Invalid variants JSON",
  });
}

    const productData = {
      name,
      description,
      variants: parsedVariants, // <- this will work now
      bestseller: bestseller === "true",
      category,
      subCategory,
      images: imagesUrl,
      brand,
      discount: Number(discount) || 0,
      sellerApplicationId: null,
      status: "approved",
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- LIST ALL PRODUCTS --------------------
const listProduct = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("sellerApplicationId");

    res.json({ success: true, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- REMOVE PRODUCT (ADMIN) --------------------
const removeProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    await productModel.findByIdAndDelete(productId);

    res.json({ success: true, message: "Product removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- SELLER ADD PRODUCT --------------------
const addSellerProduct = async (req, res) => {
  try {
    const sellerApplication = await sellerApplicationModel.findOne({
      userId: req.user.id,
      status: "approved",
    });

    if (!sellerApplication) {
      return res.json({
        success: false,
        message: "No approved seller account found",
      });
    }

    const {
      name,
      description,
      variants,
      category,
      subCategory,
      brand,
      discount,
    } = req.body;

    const images = ["image1", "image2", "image3", "image4"]
      .map((key) => req.files?.[key]?.[0])
      .filter(Boolean);

    const imagesUrl = images.map((file) => file.path);

    let parsedVariants = [];
    try {
      parsedVariants = JSON.parse(variants || "[]");
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid variants format",
      });
    }

    const productData = {
      name,
      description,
      variants: parsedVariants,
      category,
      subCategory,
      images: imagesUrl,
      brand,
      discount: Number(discount) || 0,
      sellerApplicationId: sellerApplication._id,
      status: "pending",
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product submitted for approval",
      product,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- GET SELLER PRODUCTS --------------------
const sellerProducts = async (req, res) => {
  try {
    const sellerApplication = await sellerApplicationModel.findOne({
      userId: req.user.id,
      status: "approved",
    });

    if (!sellerApplication) {
      return res.json({
        success: false,
        message: "No approved seller account found",
      });
    }

    const products = await productModel.find({
      sellerApplicationId: sellerApplication._id,
    });

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- SELLER REMOVE PRODUCT --------------------
const sellerRemoveProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    const sellerApplication = await sellerApplicationModel.findOne({
      userId: req.user.id,
      status: "approved",
    });

    if (
      !sellerApplication ||
      product.sellerApplicationId?.toString() !==
        sellerApplication._id.toString()
    ) {
      return res.json({
        success: false,
        message: "You are not allowed to delete this product",
      });
    }

    await productModel.findByIdAndDelete(productId);

    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- PENDING PRODUCTS (ADMIN) --------------------
const getPendingProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({ status: "pending" })
      .populate("sellerApplicationId");

    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- APPROVE PRODUCT --------------------
const approveProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    product.status = "approved";
    product.rejectionReason = "";
    await product.save();

    res.json({ success: true, message: "Product approved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// -------------------- REJECT PRODUCT --------------------
const rejectProduct = async (req, res) => {
  try {
    const { productId, reason } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    product.status = "rejected";
    product.rejectionReason = reason || "";
    await product.save();

    res.json({ success: true, message: "Product rejected" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getStoreProducts = async (req, res) => {
  try {
    const { storeId } = req.params;

    const products = await productModel.find({
      sellerApplicationId: storeId,
      status: "approved",
    });

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// -------------------- EXPORT --------------------
export {
  addProduct,
  listProduct,
  removeProduct,
  addSellerProduct,
  sellerProducts,
  sellerRemoveProduct,
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getStoreProducts
};