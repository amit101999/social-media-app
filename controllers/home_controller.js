// module.exports.home = (req, res) => {};
//or
exports.home = (req, res) => {
  console.log(req.cookies);
  res.cookie("user", "atul");
  return res.render("home", {
    title: "social media",
  });
};
