import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/Error.js";

export const register = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return next(createError(400, "Some of the required fields are missing!!"));
  }

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("User has been registered successfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return next(createError(400, "Some of the required fields are missing!!"));
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Invalid username or password"));

    const payload = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(payload, process.env.JWT, {
      expiresIn: "1d",
    });

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherDetails);
  } catch (error) {
    next(error);
  }
};

export const isLoggedIn = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }

  return jwt.verify(token, process.env.JWT, (error) => {
    if (error) {
      return res.json(false);
    } else return res.json(true);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).send("Successfully logged out");
};
