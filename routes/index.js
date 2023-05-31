/*
Define the API routes
*/

const express = require("express");
const router = express.Router();

// require('./register')(router);
// require('./login')(router);
// require('./users')(router);
// require('./excerpts')(router);
// require('./profile')(router);
// require('./verify')(router);
// require('./verify')(router);
// require('./resend')(router);
require("./users")(router);

module.exports = router;
