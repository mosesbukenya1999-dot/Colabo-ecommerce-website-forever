import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const placeOrder = async (req, res) => {
    try {
  
      const { items, address, amount } = req.body;
  
      const userId = req.user.id;
  
      // Remove invalid items
      const filteredItems = items.filter(
        (item) => item.quantity > 0
      );
  
      // Optional: prevent empty orders
      if (filteredItems.length === 0) {
        return res.json({
          success: false,
          message: "No valid items in order"
        });
      }
  
      const orderData = {
        items: filteredItems,
        address,
        amount,
        userId,
        paymentMethod: "COD",
        payment: false,
        date: Date.now(),
      };
  
      const newOrder = new orderModel(orderData);
  
      await newOrder.save();
  
      await userModel.findByIdAndUpdate(userId, {
        cartData: {}
      });
  
      res.json({
        success: true,
        message: "Order Placed"
      });
  
    } catch (error) {
      console.log(error);
  
      res.json({
        success: false,
        message: error.message
      });
    }
  };

const placeOrderStripe = async(req,res)=> {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const placeOrderRazorpay = async(req,res)=> {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const updateStatus = async(req,res)=> {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const userOrders = async(req,res)=> {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({userId});

        res.json({success:true, orders})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const allOrders = async(req,res)=> {
    try {
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {allOrders,userOrders, placeOrder,placeOrderRazorpay,placeOrderStripe, updateStatus}