import jwt from "jsonwebtoken";
import { createError } from "./Error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT, (error, decoded) => {
    if (error) {
      return next(createError(401, "Token is invalid"));
    }
    req.user = decoded;
    next();
  });
};
