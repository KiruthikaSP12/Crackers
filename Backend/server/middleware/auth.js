export const attachUser = (req, _res, next) => {
  req.userRole = req.headers["x-role"] || "customer";
  next();
};

export const requireAdmin = (req, res, next) => {
  if (req.userRole !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }

  next();
};
