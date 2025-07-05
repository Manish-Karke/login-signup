const ensureAuthori = require("../Middleware/auth");

const porrouter = require("express").Router();

porrouter.get("/", ensureAuthori, (req, res) => {
  console.log("--user detail--", req.user);
  res.status(200).json([
    {
      name: "mobile",
      price: 400,
    },
    {
      name: "laptop",
      price: 400,
    },
  ]);
});

module.exports = porrouter;
