/*
Define the API routes
*/

const express = require("express");
const router = express.Router();

require("./base")(router);
// require("./login")(router);

module.exports = router;
