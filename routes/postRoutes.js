const express = require("express");
const router = express.Router();
const { Post } = require("../models/Post");
const { show_posts } = require("../controllers/postsController");
const {
  add_comment,
  delete_comment,
  update_comment,
} = require("../controllers/postsController");
////must be authenticated
router.get("/", show_posts);
router.post("/:id", add_comment);
router.delete("/:id/:ida", delete_comment);

router.patch("/:id/editcomment/:ida", update_comment);

module.exports = router;
