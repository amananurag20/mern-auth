const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "helloworld";

exports.verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(" ")[1];

  jwt.verify(String(token), JWT_SECRET_KEY, (error, data) => {
    console.log("Token data is", data);
    if (error) {
      return res.this.status(403).json({ message: error });
    }
    req.id = data.id;
  });

  next();
};
