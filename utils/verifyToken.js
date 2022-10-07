import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  if (!cookies) return res.status(401).json({ message: "No token found" });
  const token = cookies.split("=")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json({ message: "Token expired" });
    req.user = user;
    next();
  });
};

export default verifyToken;
