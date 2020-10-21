const { User } = require("../models/User");
const _ = require("lodash");
////for admin routes
const get_users = (req, res) => {
  User.find({})
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("there is no users");
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
const delete_user = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id, (err, user) => {
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("user does not exist");
    }
    if (err) {
      res.status(400).send(err);
    }
  });
};
/////for user profile editing  route

const edit_profile = (req, res) => {
  ///update the data and redirect to profile page
  const id = req.params.id;
  const user = req.user;
  const body = _.pick(req.body, ["name", "email", "password"]);
  if (user.id == id) {
    User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, useFindAndModify: false }
    )
      .then((doc) => {
        if (doc) {
          res.status(200).send(doc);
        } else {
          res.status(400).send();
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } else {
    res.status(400).send("not your accout mfka");
  }
};
module.exports = {
  get_users,
  delete_user,
  edit_profile,
};
