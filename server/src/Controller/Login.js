const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/UserModel");

const JWT_SECRET = "full_throttle_jwt";

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = UserLogin;
