exports.isSuperAdmin = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.status(403).json({ message: "Access denied. Super admin only." });
  }
  next();
};

exports.isEmployee = (req, res, next) => {
  if (req.user.role !== "employee") {
    return res.status(403).json({ message: "Access denied. Employee only." });
  }
  next();
};