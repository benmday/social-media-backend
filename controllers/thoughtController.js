const { Users, Thoughts } = require("../models");

async function getAllThoughts(req, res) {
  try {
    const thoughts = await Thoughts.find().select("-__v");
    res.json(thoughts);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function getOneThought(req, res) {
  try {
    const thought = await Thoughts.findById(req.params._id).select("-__v");
    if (!thought) {
      res.json("No thought found!");
    }
    res.json(thought);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function createThought(req, res) {
  try {
    const newThought = await Thoughts.create(req.body);
    const userThought = await Users.findByIdAndUpdate(
      req.body.userId,
      { $addToSet: { thoughts: newThought._id } },
      { new: true }
    );
    res.json(newThought);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function updateThought(req, res) {
  try {
    const updatedThought = await Thoughts.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    if (!updatedThought) {
      res.json("Please try again");
    }
    res.json(updatedThought);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function deleteThought(req, res) {
  try {
    const deletedThought = await Thoughts.findByIdAndDelete(req.params._id);
    if (!deletedThought) {
      res.json("No thought found, cannot delete");
    }
    res.json("Thought deleted!");
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function addReaction(req, res) {
  try {
    const newReaction = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true }
    );
    if (!newReaction) {
      res.json("Please check your reaction body.");
    }
    res.json(newReaction);
  } catch {
    (err) => res.status(500).json(err);
  }
}

async function deleteReaction(req, res) {
  try {
    const deletedReaction = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { _id: req.body.reactionId } } },
      { new: true }
    );
    if (!deletedReaction) {
      res.json("No reaction found. Please try again.");
    }
    res.json(deletedReaction);
  } catch {
    (err) => res.status(500).json(err);
  }
}

module.exports = {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
};
