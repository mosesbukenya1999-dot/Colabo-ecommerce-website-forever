import userModel from "../models/userModel.js";


const addToCart = async (req,res)=> {
    try {
        
        const {itemId,sizes} = req.body;

        const userId = req.user.id;

        if (!userId) {
            return res.json({success:false, message: "User does not exist"})
        };
        
        const userData = await userModel.findById(userId);

        const cartData = userData.cartData || {};

        if (cartData[itemId]) {
            if (cartData[itemId][sizes]) {
                cartData[itemId][sizes]+=1;
            } else {
                cartData[itemId][sizes]=1
            }
        }else {
            cartData[itemId]={};
            cartData[itemId][sizes]=1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData});

        res.json({success:true, message: "Added to Cart"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const getCart = async (req,res)=> {
    try {
        
        const {itemId,sizes,userId} = req.body;

        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const updateCart = async (req,res)=> {
    try {
        
        const {itemId,sizes,userId} = req.body;

        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export { addToCart, updateCart,getCart}