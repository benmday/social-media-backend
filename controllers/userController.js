const { Users, Thoughts } = require("../models");

async function getAllUsers(req, res) {
  try {
    const users = await Users.find().select("-__v");
    res.json(users);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function getOneUser(req, res) {
  try {
    const user = await Users.findById(req.params._id).select("-__v");
    if (!user) {
      res.json("No user found!");
    }
    res.json(user);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function createUser(req, res) {
  try {
    const newUser = await Users.create(req.body);
    res.json(newUser);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await Users.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.json("Please try again");
    }
    res.json(updatedUser);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function deleteUser(req, res) {
  try {
    const deletedUser = await Users.findByIdAndDelete(req.params._id);
    if (!deletedUser) {
      res.json("No user found, cannot delete");
    }
    if (deletedUser) {
      const cascadeDelete = await Thoughts.deleteMany({
        username: deletedUser.username,
      });
    }
    res.json("User and associated thoughts deleted!");
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function addFriend(req, res) {
  try {
    const newFriend = await Users.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!newFriend) {
      res.json("No user found, cannot add friend");
    }
    res.json(newFriend);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function deleteFriend(req, res) {
  try {
    const deletedFriend = await Users.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!deletedFriend) {
      res.json("No user found, cannot remove friend");
    }
    res.json("Friend removed.");
  } catch {
    (err) => res.status(500).json(err);
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
};
