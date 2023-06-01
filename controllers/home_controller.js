// module.exports.home = (req, res) => {};
//or
exports.home = (req, res) => {
  return res.render("home", {
    title: "social media",
  });
};
