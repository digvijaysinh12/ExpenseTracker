import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.body.token || req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token Missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log("User decoded from token:", req.user);

    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export const isUser = (req, res, next) => {
  try {
    if (req.user.role !== "User") {
      return res.status(401).json({ success: false, message: "Unauthorized User" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Authorization error" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({ success: false, message: "Unauthorized Admin" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: "Authorization error" });
  }
};
