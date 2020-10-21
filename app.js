////////////ThirdPartyLib//////////////
const _ = require("lodash");
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
////////myDir/////////////////////////
const { mongoose } = require("./db/mongoose");
const { requireAuth } = require("./middlewares/authMiddleware");
///////////////////////////////////
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/authRoutes"));
app.use("/adminpanel", requireAuth, require("./routes/adminRoutes"));
app.use("/profile", requireAuth, require("./routes/userRoutes"));
debugger;
app.use("/post", requireAuth, require("./routes/postRoutes"));
app.get("/home", requireAuth, (req, res) => {
  //redner the home page
  ///profile page link
  //messsages link
  //post link
  res.send("home");
});

app.listen(3000, () => console.log("listing in port 3000"));
