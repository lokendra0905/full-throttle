const jwt = require("jsonwebtoken");
const { UserModel } = require("../Models/UserModel");

const JWT_SECRET = "full_throttle_jwt";

const UserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new UserModel({ name, email, password });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

module.exports = UserRegister;
