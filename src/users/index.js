/*
Define the API routes
*/

const express = require("express");
const router = express.Router();

require("./register")(router);
require("./login")(router);

module.exports = router;
