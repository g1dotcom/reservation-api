const User = require("../models/User");

const updateUser = async (req, res) => {
  try {
    const user = User.findByIdAndUpdate(
      req.paramms.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch {
    res.status(500).json(error);
  }
};

const detailUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch {
    res.status(500).json(error);
  }
};

const allUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  detailUser,
  allUser,
};
