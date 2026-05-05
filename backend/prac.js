require("dotenv").config();

const PORT = process.env.PORT || 4000;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(cors());

const mongoDB = process.env.MONGO_URI;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to mongoDB")
    )
    .catch(err => console.error("Not connected:", err)
    )

app.get("/", (req, res) => {
    res.send("Hello Express is working")
})


//storage
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})


//endpoint for uploading images;
app.use("/images", express.static("upload/images"))
app.post("/upload", upload.single("product"), (req, res) => {
    if (!req.file) {
        res.status(404).json({
            success: 0,
            message: "File not uploaded"
        })
    } else {
        res.status(200).json({
            success: 1,
            image_url: `http://localhost:${PORT}/images/${req.file.filename}`
        })
    }
})

//schem
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    new_price: {
        type: Number,
        required: true,
    },

    old_price: {
        type: Number,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now(),
    },

    available: {
        type: Boolean,
        default: true,
    }
});


//posting product
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;

    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1
    } else {
        id = 1;
    };


    const product = new Product({
        id: id,
        name: req.body.name,
        category: req.body.category,
        image: req.body.image,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });

    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name
    })

});


//delete a prod
app.post("/delete", async (req, res) => {
    try {

        const product = await Product.findOneAndDelete({ id: req.body.id });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        console.log("Removed:", product.name);
        res.status(200).json({
            success: true,
            name: product.name
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//get all products
app.get("/allproducts", async (req, res) => {
    try {

        const products = await Product.find({});

        console.log("All products Fetched");

        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


const Users = mongoose.model("Users", {
    name: {
        type: String,
    },

    email: {
        type: String,
        unique: true,
    },

    password: {
        type: String,
    },

    cartData: {
        type: Object,
    },

    date: {
        type: Date,
        default: Date.now()
    }
})


app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(401).json({ success: false, errors: "existing email found with same email address" })
    }

    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0
    }

    const user = new user({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, "secret_ecom");
    res.status(200).json({
        success: true,
        token
    })

});


app.post("/login", async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(data, "secret_ecom");
            res.status(200).json({
                success: true,
                token
            })

        } else {
            res.status(401).json({ success: false, errors: "Wrong Password" })
        }
    } else {
        res.status(401).json({ success: false, errors: "Wrong Email" })
    }
})




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})