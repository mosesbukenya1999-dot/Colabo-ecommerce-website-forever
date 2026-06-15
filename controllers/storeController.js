import sellerApplicationModel from "../models/sellerApplicationModel.js";
import productModel from "../models/productModel.js";

export const getStoreById = async (req, res) => {
  try {
    const { storeId } = req.params;

    // 1. Get store info
    const store = await sellerApplicationModel.findById(storeId);

    if (!store) {
      return res.json({
        success: false,
        message: "Store not found",
      });
    }

    // 2. Get ONLY approved products for this store
    const products = await productModel.find({
      sellerApplicationId: storeId,
      status: "approved",
    });

    res.json({
      success: true,
      store,
      products,
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};