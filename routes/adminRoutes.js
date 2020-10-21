//////Admin panel /GET , POST a post ,GET All posts ,GET all users ,
const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { requireAdmin } = require("../middlewares/authMiddleware");
const {
  add_post,
  delete_post,
  edit_post,
} = require("../controllers/postsController");
const { get_users, delete_user } = require("../controllers/usersController");
///posts manging

router.post("/posts/add", add_post);
router.delete("/posts/:id", delete_post);
router.patch("/posts/:id", edit_post);

////////////////users manging/////////////////
router.get("/users", get_users);
router.delete("/users/:id", delete_user);

///////reports/////////////
module.exports = router;
