import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "No Token Found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 set user like userAuth does
    req.user = { id: decoded.id };

    // 🔥 OPTIONAL security check (email-based admin)
    const isAdmin =
      decoded.id === process.env.ADMIN_ID || // optional
      decoded.email === process.env.ADMIN_EMAIL;

    if (!isAdmin) {
      return res.json({
        success: false,
        message: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;