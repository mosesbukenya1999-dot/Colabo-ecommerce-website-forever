import productModel from "../models/productModel.js";


const addProduct = async (req, res) => {
    try {
      const { name, description, price, bestseller, category, subCategory, sizes } = req.body;
  
      // collect files from multer
      const imageFiles = [req.files.image1, req.files.image2, req.files.image3, req.files.image4]
        .flat() // flatten arrays
        .filter(Boolean); // remove undefined
  
      // Cloudinary URLs
      const imagesUrl = imageFiles.map(file => file.path); // <- this is the key change
  
      const productData = {
        name,
        description,
        sizes: JSON.parse(sizes),
        price,
        bestseller: bestseller === "true" ? true : false,
        category,
        subCategory,
        images: imagesUrl,
      };
  
      const product = new productModel(productData);
      await product.save();
  
      res.json({ success: true, message: "Product Added" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };

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