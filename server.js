const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const compression = require("compression");
const routes = require("./src/users");
const bodyParser = require("body-parser");
// const { mongoose } = require('./src/database');
const path = require("path");
const socketHandler = require("./src/socket");

const app = express();

app.use(cors());

app.use(compression());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "frontend", "build")));

// distinguish api calls by using /api as prefix
app.use("/api", routes);
app.use("/api", require("./src/items"));

app.use("*", (req, res) =>
  res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
);

const server = require("http").createServer(app);
const io = require("socket.io")(server);

// An object used to store username/socket ID pairs
var username_socket_pair = {};

// An object used to store lobby data
var all_users = {};

io.on("connection", function (socket) {
  socketHandler(socket, io, username_socket_pair, all_users);
});

const port = process.env.APP_PORT || 5000;
server.listen(port, () =>
  console.log(`Server up and running on port ${port} !`)
);
