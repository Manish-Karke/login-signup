const mongoose = require("mongoose");

const mon_url = process.env.MONGO_DB;

mongoose
  .connect(mon_url)
  .then(() => {
    console.log("mogoose is connected");
  })
  .catch((err) => {
    console.log("mogoose is not connected");
  });
