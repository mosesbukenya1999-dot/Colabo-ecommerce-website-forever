import productModel from "../models/productModel.js";

/**
 * Reduce stock after order is placed
 * Body:
 * [
 *   {
 *     productId,
 *     size,
 *     quantity
 *   }
 * ]
 */
export const reduceStockAfterOrder = async (req, res) => {
  try {
    const items = req.body.items;

    if (!items || !items.length) {
      return res.status(400).json({
        success: false,
        message: "No items provided",
      });
    }

    for (const item of items) {
      const { productId, size, quantity } = item;

      const product = await productModel.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const variant = product.variants.find(
        (v) => (v.size || "default") === (size || "default")
      );

      if (!variant) {
        return res.status(400).json({
          success: false,
          message: "Variant not found",
        });
      }

      // ❗ STOCK CHECK
      if (variant.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for ${product.name}`,
        });
      }

      // 🔥 REDUCE STOCK
      variant.stock -= quantity;
    }

    await Promise.all(
      items.map(async (item) => {
        const product = await productModel.findById(item.productId);
        await product.save();
      })
    );

    return res.json({
      success: true,
      message: "Stock updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};