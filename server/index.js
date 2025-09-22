const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const port = 8000;
const mongo_Url =
  "mongodb+srv://krtyaka14_db_user:6BtmwcwlvKf6uylv@cluster0.00zy9rp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const app = express();
const qrRoutes = require("./routes/qrRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
//Middle ware
app.use(cors());
app.use(express.json());
app.use("/api/qrcode", qrRoutes);
app.use("/api/notify", notificationRoutes);

//DataBase
mongoose
  .connect(mongo_Url)
  .then(() => {
    console.log("DataBase connected sucessfully");
  })
  .catch((err) => {
    console.log(err);
  });

//Routes
app.use("/user", require("./routes/userAuth"));
app.use("/health", require("./routes/healthRecord"));
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
