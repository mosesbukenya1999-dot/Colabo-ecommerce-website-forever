import sellerApplicationModel from "../models/sellerApplicationModel.js";
import userModel from "../models/userModel.js";

/**
 * USER: Submit seller application
 */
const submitApplication = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      fullName,
      email,
      phoneNumber,
      location,

      businessName,
      businessType,

      productCategory,
      productDescription,

      storeName,
      storeDescription,
      storeLocation,

      lat,
      lng,
    } = req.body;

    // 📄 Verification Files
    const nationalId =
      req.files?.nationalId?.[0]?.path || "";

    const businessLicense =
      req.files?.businessLicense?.[0]?.path || "";

    // 🏪 Store Files
    const storeLogo =
      req.files?.storeLogo?.[0]?.path || "";

    const storeBanner =
      req.files?.storeBanner?.[0]?.path || "";

    // 🚨 Prevent duplicate active applications
    const existing = await sellerApplicationModel.findOne({
      userId,
      status: {
        $in: ["pending", "under_review", "approved"],
      },
    });

    if (existing) {
      return res.json({
        success: false,
        message: "You already have an active application",
      });
    }

    const newApplication = new sellerApplicationModel({
      userId,

      // Personal
      fullName,
      email,
      phoneNumber,
      location,

      // Business
      businessName,
      businessType,

      // Product
      productCategory,
      productDescription,

      // Store
      storeName,
      storeDescription,
      storeLocation,

      storeLogo,
      storeBanner,

      coordinates: {
        lat: lat ? Number(lat) : null,
        lng: lng ? Number(lng) : null,
      },

      isStoreVisible: false,

      // Verification
      nationalId,
      businessLicense,

      status: "pending",
    });

    await newApplication.save();

    res.json({
      success: true,
      message: "Application submitted successfully",
      application: newApplication,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ADMIN: Approve / Reject Seller Application
 */
const adminVerifying = async (req, res) => {
  try {
    const adminId = req.user.id;

    const {
      applicationId,
      action,
      rejectionReason,
    } = req.body;

    const application =
      await sellerApplicationModel.findById(applicationId);

    if (!application) {
      return res.json({
        success: false,
        message: "Application not found",
      });
    }

    // ✅ APPROVE
    if (action === "approve") {
      application.status = "approved";

      application.isStoreVisible = true;

      application.reviewedBy = adminId;
      application.reviewedAt = new Date();

      await application.save();

      await userModel.findByIdAndUpdate(
        application.userId,
        {
          role: "seller",
        }
      );

      return res.json({
        success: true,
        message: "Seller approved successfully",
      });
    }

    // ❌ REJECT
    if (action === "reject") {
      application.status = "rejected";

      application.rejectionReason =
        rejectionReason || "Not specified";

      application.isStoreVisible = false;

      application.reviewedBy = adminId;
      application.reviewedAt = new Date();

      await application.save();

      return res.json({
        success: true,
        message: "Application rejected",
      });
    }

    return res.json({
      success: false,
      message: "Invalid action",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * ADMIN: Get all applications
 */
const getApplications = async (req, res) => {
  try {
    const applications =
      await sellerApplicationModel
        .find()
        .sort({ createdAt: -1 });

    res.json({
      success: true,
      applications,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * USER: Get My Application
 */
const getMyApplication = async (req, res) => {
  try {
    const application =
      await sellerApplicationModel.findOne({
        userId: req.user.id,
      });

    if (!application) {
      return res.json({
        success: false,
        message: "No application found",
      });
    }

    res.json({
      success: true,
      application,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * PUBLIC: Browse Approved Stores
 */
const getApprovedStores = async (req, res) => {
  try {
    const stores = await sellerApplicationModel
      .find({
        status: "approved",
      })
      .select(
        `
        storeName
        storeDescription
        storeLogo
        storeBanner
        storeLocation
        storeRating
        totalReviews
        coordinates
      `
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      stores,
    });

  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// GET store by ID (public)
const getStoreById = async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = await sellerApplicationModel.findById(storeId);

    if (!store) {
      return res.json({ success: false, message: "Store not found" });
    }

    res.json({ success: true, store });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};




export {
  submitApplication,
  adminVerifying,
  getApplications,
  getMyApplication,
  getApprovedStores,
  getStoreById
};