// module.exports.function name is same as exports.function

module.exports.profile = (req, res) => {
  return res.render("user_profile");
};

//render singUp page
module.exports.signUp = (req, res) => {
  return res.render("user_sign_up");
};

//render singIn page
exports.signIn = (req, res) => {
  return res.render("user_sign_in");
};

//creating user
exports.createUser = async (req, res) => {
  return res.send("get user");
};

exports.createSession = async (req, res) => {
  return res.send("session created");
};
