const express = require("express");
const { signup } = require("../controllers/auth-controller");

const router = express.Router();

router.post("/", signup); //http:localhost:3000/users/

module.exports = router;
