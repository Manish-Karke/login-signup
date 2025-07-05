const authctrl = require("../contoller/authController");

const {
  signupValidation,
  loginValidation,
} = require("../Middleware/authvalidator");

const router = require("express").Router();



router.post("/signup", signupValidation, authctrl.signup);
router.post("/login", loginValidation, authctrl.login);

module.exports = router;
