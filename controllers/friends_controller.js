const User = require("../models/user");
const Friend = require("../models/friends");

exports.addFriends = async (req, res) => {
  let to = req.query.to;
  let from = req.query.from;
  try {
    const user = await User.findById(from);
    if (user) {
      let newFriend = await Friend.create({
        from_user: from,
        to_user: to,
      });
      // right now iam pushing other user id but i have to push friend model id into the user friends array
      await user.friends.push(to);
      await user.save();

      return res.redirect("back");
    }
  } catch (err) {
    console.log("error in adding friends :", err);
    return res.redirect("back");
  }
};

exports.deleteFriends = async (req, res) => {
  let to = req.query.to;
  let from = req.query.from;
  try {
    await User.findByIdAndUpdate(from, { $pull: { friends: to } });
    return res.redirect("back");
  } catch (err) {
    console.log("error in Removing friends :", err);
    return res.redirect("back");
  }
};
