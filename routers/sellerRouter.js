import express from "express";
import upload from "../middlewares/multer.js";
import {
  adminVerifying,
  getApplications,
  getApprovedStores,
  getMyApplication,
  getStoreById,
  submitApplication,
} from "../controllers/sellerController.js";
import userAuth from "../middlewares/userAuth.js";
import adminAuth from "../middlewares/adminAuth.js";



const sellerRouter = express.Router();

//  USER: submit seller application
sellerRouter.post(
  "/sell",
  userAuth,
  upload.fields([
    { name: "nationalId", maxCount: 1 },
    { name: "businessLicense", maxCount: 1 },
  
    { name: "storeLogo", maxCount: 1 },
    { name: "storeBanner", maxCount: 1 },
  ]),
  submitApplication
);

sellerRouter.get("/allapprovals", adminAuth,getApplications)

sellerRouter.get("/stores", getApprovedStores)

sellerRouter.get("/store/:storeId", getStoreById);

//  ADMIN: approve/reject application
sellerRouter.post(
  "/approve",
  adminAuth,
  adminVerifying
);
sellerRouter.get(
    "/myapplication",
    userAuth,
    getMyApplication
  );

export default sellerRouter;