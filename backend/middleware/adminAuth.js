import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.json({ success: false, message: "Admin access only" });
    }

    req.body.userId = decoded.id;
    next();
  } catch (error) {
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default adminAuth;