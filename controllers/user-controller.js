const User = require("../models/auth-modal");

exports.getUser = async (req, res) => {
  console.log("getuser fxn");
  try {
    const user = await User.findById(req.id);
    if (!user) {
      return res.status(403).json({ message: "wrong user details" });
    }
    return res.status(201).json({ message: user });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Something went wrong" });
  }
};
