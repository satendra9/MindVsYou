const isUser = (req, res, next) => {
  if (!req.user || req.user.role.toLowerCase() !== "user") {
    return res.status(403).json({ message: "User access only" });
  }
  next();
};

export default isUser;