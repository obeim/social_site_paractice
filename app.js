////////////ThirdPartyLib//////////////
const _ = require("lodash");
const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
////////myDir/////////////////////////
const { mongoose } = require("./db/mongoose");
const { requireAuth, requireAdmin } = require("./middlewares/authMiddleware");
///////////////////////////////////
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/", require("./routes/authRoutes"));
app.use("/adminpanel", requireAdmin, require("./routes/adminRoutes"));
app.use("/profile", requireAuth, require("./routes/userRoutes"));
app.use("/post", requireAuth, require("./routes/postRoutes"));
app.get("/home", requireAuth, (req, res) => {
  res.send("home");
});

app.listen(3000, () => console.log("listing in port 3000"));

module.exports = { app };
