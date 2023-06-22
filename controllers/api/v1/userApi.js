const User = require("../../../models/user");
const jwt = require("jsonwebtoken");

exports.createSession = async (req, res) => {
  try {
    //generating jsonwebtoken
    let user = await User.findOne({ email: req.body.email });

    if (!user || user.password != req.body.password) {
      return res.status(422).json({ message: "Invalid User or Password" });
    }

    return res.status(200).json({
      message: "sign is success",
      data: {
        token: jwt.sign(user.toJSON(), "AMIT", { expiresIn: 100000 }),
      },
    });
  } catch (err) {
    console.log("cant find user ; ", err);
  }
};
