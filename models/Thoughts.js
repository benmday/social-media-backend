const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reactions");

function dateFormat(date) {
  const formattedDate = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(formattedDate);
}

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: dateFormat,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtsSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
