const connection = require("../config/connection");
const { Users, Thoughts } = require("../models");

console.time("seeding");

connection.once("open", async () => {
  await Users.deleteMany({});
  await Thoughts.deleteMany({});

  const userData = [
    { username: "bjohnson", email: "bjohn@email.com" },
    { username: "max2", email: "max2@email.com" },
    { username: "calson98", email: "calvinpeterson@email.com" },
    { username: "allpeck", email: "allenpeck@email.com" },
    { username: "23jasonr", email: "jasonram23@email.com" },
  ];

  // const thoughtData = [
  //   {
  //     thoughtText:
  //       "Grilled cheese is the greatest sandwich of all time. Fight me!",
  //     username: "calson98",
  //     reactions: [
  //       { reactionBody: "I agree. Great sandwich.", username: "23jasonr" },
  //       {
  //         reactionBody: "Bro, you can't do the Reuben dirty like that!",
  //         username: "max2",
  //       },
  //       {
  //         reactionBody: "I would argue that the PB&J is more classic.",
  //         username: "bjohnson",
  //       },
  //     ],
  //   },
  //   {
  //     thoughtText: "How do you post this?",
  //     username: "allpeck",
  //     reactions: [
  //       { reactionBody: "Looks like you got it!", username: "23jasonr" },
  //       { reactionBody: "I'm confused.", username: "calson98" },
  //     ],
  //   },
  //   {
  //     thoughtText: "Andrew Garfield can get it.",
  //     username: "bjohnson",
  //     reactions: [
  //       {
  //         reactionBody: "Did you see him in Tick, Tick, Boom??",
  //         username: "max2",
  //       },
  //       {
  //         reactionBody: "I will never recover from Hacksaw Ridge.",
  //         username: "calson98",
  //       },
  //       {
  //         reactionBody: "I don't understand the appeal, personally.",
  //         username: "23jasonr",
  //       },
  //       { reactionBody: "LOL", username: "allpeck" },
  //     ],
  //   },
  // ];

  const userSeed = await Users.insertMany(userData);
  // const thoughtSeed = await Thoughts.insertMany(thoughtData);

  // const userUpdate = await Users.findOneAndUpdate(
  //   { username: "bjohnson" },
  //   { thoughts: [{ _id: thoughts[0]._id }] }
  // );

  console.timeEnd("seeding");
  console.log(userSeed);
  // console.log(thoughtSeed);
  // console.log("ObjectID " + userUpdate);
  process.exit(0);
});
