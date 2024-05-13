const express = require("express");
const { signup, login } = require("../controllers/auth-controller");
const { getUser } = require("../controllers/user-controller");

const { verifyToken } = require("../middlware/verify-token");

const router = express.Router();

router.post("/", signup);
router.get("/", login); //http:localhost:3000/users/
router.get("/getuser", verifyToken, getUser);

module.exports = router;
