import User from "../models/userModel.js";

export const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { password, ...otherDetails } = user._doc;
    res.status(200).json(otherDetails);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
