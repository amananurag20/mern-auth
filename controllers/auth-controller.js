const User = require("../models/auth-modal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "helloworld";

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

    const hashPassword = await bcrypt.hash(password, 10);
    console.log("hashpassord ye waala hai", hashPassword);
    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("body", req.body);
    let existingUser;
    try {
      existingUser = await User.findOne({ email });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (!existingUser) {
      return res.status(403).json({ message: "Email id is not registered" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Password is incorrect" });
    }

    const token = jwt.sign({ id: existingUser._id }, JWT_SECRET_KEY, {
      expiresIn: "30sec",
    });

    console.log(token);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
