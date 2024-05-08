const User = require("../models/auth-modal");

exports.signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let existingUser;

    try {
      existingUser = await User.findOne({ email });
    } catch (e) {
      console.log(e);
      return res.status(401).json({ message: "something went wrong" });
    }
    if (existingUser) {
      return res.status(401).json({ message: "Email id already exist" });
    }

    const user = await User.create({
      name: name,
      email: email,
      password: password,
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "something went wrong" });
  }
};
