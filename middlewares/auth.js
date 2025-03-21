import jwt from "jsonwebtoken";

export const ensureAuthenticated = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res.status(403).json({ message: "Token is required" });
  }
  try {
    jwt.verify(req.headers["authorization"], process.env.SECRET);
    return next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Token is not valid or it's expired" });
  }
};