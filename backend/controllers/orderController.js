import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const placeOrder = async(req,res)=> {
    try {
        
        const {items,address,amount} = req.body;

        const userId = req.user.id;

        const orderData = { 
            items,
            address,
            amount,
            userId,
            paymentMethod: "COD",
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);

        const order = await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{ cartData:{}});

        res.json({success:true, message: "Order Placed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

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