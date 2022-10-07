import jwt from "jsonwebtoken";

const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) return res.status(400).json({ message: "Token not found!" });
  jwt.verify(prevToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token expired" });
    res.clearCookie(`${user._id}`);
    req.cookies[`${user._id}`] = "";
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 1000 * 30),
    });
    req.user = user;
    next();
  });
};

export default refreshToken;
