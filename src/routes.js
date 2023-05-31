const express = require("express");
const router = express.Router();

const users = require("./users");

require("./users", users);

module.exports = router;
