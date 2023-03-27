const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne(email);
    if (user)
      return res.status(400).json({ message: "The user already exists" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password is at least 6 characters long" });
    const passwordHash = await bcrypt.hash(password, 10);

    if (!İsEmail(email))
      return res.status(400).json({ message: "Invalid email" });

    const newUser = await User.create({ ...req.body, password: passwordHash });

    const token = await jwt.sign(
      { id: newUser._id, idAdmin: newUser.isAdmin },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );

    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({ token, newUser });
  } catch (error) {}
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne(email);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare)
      return res.status(400).json({ message: "Incorrect password" });
    const token = await jwt.sign(
      {
        id: user._id,
        idAdmin: user.isAdmin,
      },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );
    res.cookie("token", token, { httpOnly: true }).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function İsEmail(emailAdress) {
  let regex =
    /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  if (emailAdress.match(regex)) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  register,
  login,
};
