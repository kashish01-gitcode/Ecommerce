import jwt from "jsonwebtoken";

// Use this on any route that should only work for a logged-in user.
// Frontend must send the token in headers as: { token: "<jwt>" }
const authUser = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized, please login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
