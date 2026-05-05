import productModel from "../models/productModel.js";


const addProduct = async (req,res)=>{
    try {
        
        const {name,description,price,bestseller,category,subCategory,sizes} = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1,image2,image3,image4].filter(Boolean);

        const imagesUrl = images.map(
            (file)=> `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
        );

        const productData = {
            name,
            description,
            sizes:JSON.parse(sizes),
            price,
            bestseller: bestseller==="true"?true: false,
            category,
            subCategory,
            images:imagesUrl
        };

        const product = new productModel(productData);

        await product.save();

        res.json({success:true, message:"Product Added"})
        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const listProduct = async (req,res)=>{
    try {
        
        const products = await productModel.find({});

        res.json({success:true, products})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

const removeProduct = async (req,res)=>{
    try {
        
        

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

export {addProduct,listProduct,removeProduct}