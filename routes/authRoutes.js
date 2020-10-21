////login POST and GET , signup POST and GET , logout GET
////mfka remeber to save the token in the cookie
const {
  signup_get,
  signup_post,
  logout,
  login_get,
  login_post,
} = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.get("/login", login_get);
router.post("/login", login_post);

router.get("/signup", signup_get);
router.post("/signup", signup_post);

router.get("/logout", logout);

module.exports = router;
