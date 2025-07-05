const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class authentication {
  signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body);

      const user = await UserModel.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
          success: false,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        message: "Signup successful",
        success: true,
      });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

  login = async (req, res) => {
    console.log("Login endpoint hit");
    try {
      const { email, password } = req.body;
      console.log("Body:", req.body);

      const user = await UserModel.findOne({ email });
      const errorMsg = "Auth failed: email or password is wrong";

      if (!user) {
        console.log("User not found");
        return res.status(403).json({ message: errorMsg, success: false });
      }

      console.log("Stored hash:", user.password);
      console.log("Plain password:", password);

      const isPassEqual = await bcrypt.compare(password, user.password);
      console.log("Password match:", isPassEqual);

      if (!isPassEqual) {
        return res.status(403).json({ message: errorMsg, success: false });
      }

      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        message: "Login Success",
        success: true,
        jwtToken,
        email,
        name: user.name,
      });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };
}
const authctrl = new authentication();
module.exports = authctrl;
