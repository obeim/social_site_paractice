// show all posts , add post ,delete post , edit post ,
const { Post } = require("../models/Post");
const _ = require("lodash");

const show_posts = async (req, res) => {
  Post.find({})
    .then((doc) => {
      if (doc) {
        res.status(200).send(doc);
      } else {
        res.send("there is no posts");
      }
    })
    .catch((err) => {
      res.status(404).send("not found");
    });
};

const add_post = async (req, res) => {
  const body = _.pick(req.body, ["title", "body"]);
  const post = await Post.create(body);
  if (post.title == body.title) {
    res.status(200).send(post);
  } else {
    res.status(400).send("err could not create post");
  }
};

const edit_post = async (req, res) => {
  const body = _.pick(req.body, ["title", "body"]);
  const id = req.params.id;
  Post.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true, useFindAndModify: false }
  )
    .then((doc) => {
      if (!doc) {
        res.status(404).send("post does not exist");
      } else {
        res.status(200).send(doc);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const delete_post = async (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete(id)
    .then((post) => {
      if (!post) {
        res.status(400).send("post does not exist");
      } else {
        res.status(200).send(post);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
///// comments stuff here /////////////

const add_comment = (req, res) => {
  //can add comment  here save it with user id
  const id = req.params.id;
  const user_id = req.user.id;
  const body = req.body.body;
  const comment = { user_id, body };
  console.log(comment);
  if (comment.body) {
    Post.findByIdAndUpdate(
      id,
      { $push: { comment: comment } },
      { new: true, useFindAndModify: false }
    )
      .then((doc) => {
        if (doc) {
          res.status(200).send(doc);
        } else {
          res.status(404).send("post not found");
        }
      })
      .catch((err) => {
        res.status(200).send(err);
      });
  } else {
    res.send("wtf write some comment mfka");
  }
};
//////delete comment/////////////////////////
/////a user can delete his own comment only ///
const delete_comment = (req, res) => {
  const id = req.params.id;
  const _id = req.params.ida;
  const user_id = req.user.id;

  Post.findByIdAndUpdate(
    id,
    { $pull: { comment: { _id, user_id } } },
    { new: true, useFindAndModify: false }
  )
    .then((doc) => {
      if (doc) {
        res.status(200).send(doc);
      } else {
        res.status(404).send("there is no such comment");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
////update the comment /////
const update_comment = (req, res) => {
  const id = req.params.id;
  const _id = req.params.ida;
  const user_id = req.user.id;
  const body = req.body.body;
  Post.findOneAndUpdate(
    { _id: id, "comment._id": _id, "comment.user_id": user_id },
    { $set: { "comment.$.body": body } },
    { new: true, useFindAndModify: false }
  )
    .then((doc) => {
      if (doc) {
        doc = doc.comment.filter((c) => c._id == _id);
        res.status(200).send(doc[0]);
      } else {
        res.status(404).send("there is no such comment that is yours");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  show_posts,
  add_post,
  edit_post,
  delete_post,
  /////comments
  add_comment,
  delete_comment,
  update_comment,
};
