/*
Defines all socket events from client-side sockets and the interactions.
*/

const shortid = require("shortid");
// const axios = require('axios');

const { Excerpt, User } = require("./db");

// https://stackoverflow.com/questions/24815106/can-i-separate-socket-io-event-listeners-into-different-modules
module.exports = function (socket, io, username_socket_pair, all_users) {
  console.log("A user connected: " + socket.id);

  // When a client is disconnecting (ie. exits the browser or closes the tab)
  socket.on("disconnecting", function () {
    let id_socket = "";
    // If the the client was connected to a room, find the id_socket
    if (socket.rooms) {
      Object.keys(socket.rooms).forEach((room) => {
        if (room.length == 5) {
          id_socket = room;
        }
      });
    }

    // If a id_socket is found, emit an event that the client has disconnected
    if (id_socket) {
      console.log("user disconnecting from: ", id_socket);
      io.to(id_socket).emit(
        "user_disconnect",
        id_socket,
        username_socket_pair[socket.id]
      );

      delete all_users[id_socket];
    }
  });

  // When a client leaves a room
  socket.on("leave_room", function (room_id) {
    // Remove the client socket from the room and emit a disconnect event
    try {
      socket.leave(room_id);
      io.to(room_id).emit(
        "user_disconnect",
        room_id,
        username_socket_pair[socket.id]
      );
    } catch (e) {
      console.log("Error - leave room: ", e);
    }
  });

  // Once a client has fully disconnected
  socket.on("disconnect", function () {
    // Remove the username/socket ID pair from the object
    delete username_socket_pair[socket.id];
    delete all_users[socket.id];
    console.log("User Disconnected");
  });

  // Upon a 'get_excerpt' event, send a callback with the next excerpt
  socket.on("get_excerpt", async function (room_id, callback) {
    const { excerpt_obj } = all_rooms[room_id];
    callback(excerpt_obj);
  });

  // Upon a 'randomize_excerpt' event, call the getExcerpt function to get the next excerpt from the database
  // Set the excerpt object as the room's excerpt
  socket.on("randomize_excerpt", async function (room_id) {
    // gets called once for every player that ends race
    let next_excerpt_obj = await getExcerpt();
    all_rooms[room_id].excerpt_obj = next_excerpt_obj[0];
  });

  // When a user clicks "Ready", emit an event so that all other users can see it and change the lobby's ready_count
  socket.on("ready", function (room_id, username, ready) {
    // Emit the event to the room so that all other users can see the ready status
    io.in(room_id).emit("ready_toggle", username, ready);

    // Check for invalid room_id
    if (!all_rooms[room_id]) {
      console.log("Error finding room data");
      return;
    }

    // Increase count if ready is True, else decrease count
    if (ready) {
      all_rooms[room_id].ready_count++;
    } else {
      all_rooms[room_id].ready_count--;
    }

    // Once all users in the lobby are ready
    if (all_rooms[room_id].ready_count === all_rooms[room_id].user_count) {
      // Reset the rank every time a race starts
      // race_rank is used to determine the lobby race standings at the end of the race
      all_rooms[room_id].race_rank = 1;

      // https://stackoverflow.com/questions/42398795/countdown-timer-broadcast-with-socket-io-and-node-js
      io.in(room_id).emit("race_starting");
      // Set a countdown for when the race starts. Server will emit an event every second that includes the count from 10 to 0
      let raceCountdown = setInterval(function () {
        io.in(room_id).emit(
          "start_counter",
          all_rooms[room_id].start_race_counter
        );
        all_rooms[room_id].start_race_counter--;

        // Once the countdown has reached zero, emit a race_started event and reset the countdown
        if (all_rooms[room_id].start_race_counter === 0) {
          io.in(room_id).emit("race_started");
          clearInterval(raceCountdown);
          all_rooms[room_id].start_race_counter = 10;
        }
      }, 1000);
    }
  });

  // When creating a room
  socket.on("join_online", async function (user, callback) {
    // Add the username/socket ID pair to the object
    username_socket_pair[socket.id] = user.username;

    // Generate a new room_id
    let id_socket = shortid.generate().slice(0, 5);
    let exist = socket.adapter.rooms[id_socket];

    // Ensure that it is not a duplicate of an existing id_socket
    while (exist) {
      id_socket = shortid.generate().slice(0, 5);
      exist = socket.adapter.rooms[id_socket];
    }
    socket.join(id_socket);
    console.log("id_socket", id_socket);

    // 중복검사
    // Set up the room details
    all_users[id_socket] = {
      id_socket: id_socket,
      id_user: user.id,
      username: user.username,
    };
    console.log(all_users, username_socket_pair);

    callback(id_socket);
  });

  // Get a random excerpt from the database
  async function getExcerpt() {
    const excerpt = await Excerpt.aggregate().sample(1).exec();
    // const excerpt = await Excerpt.findById('5ecda72cc0149d67b229d917')
    // 	.lean()
    // 	.exec();
    return excerpt;
  }

  // When joining a room
  socket.on("join_room", function (room_id, username, callback) {
    // Add username/socket ID pair
    username_socket_pair[socket.id] = username;

    // https://github.com/rase-/socket.io-php-emitter/issues/18
    let exist = socket.adapter.rooms[room_id];
    // If room_id exists, join the room, else return error callback
    if (exist) {
      socket.join(room_id);
      all_rooms[room_id].user_count++;

      // io.in is to all sockets including the sender
      // io.to is to all sockets excluding the sender
      io.to(room_id).emit("lobby_new_user", room_id, username);
      callback("room exists");
    } else {
      callback("room doesn't exist", room_id);
    }
  });

  // Getting the list of lobby users
  socket.on("get_lobby_users", function (room_id, callback) {
    // https://stackoverflow.com/questions/9352549/getting-how-many-people-are-in-a-chat-room-in-socket-io#24425207
    let room = io.sockets.adapter.rooms[room_id];

    // Send back an error if the room_id doesn't exist
    if (!room) {
      callback("Lobby error");
      return;
    }

    // from the room, get a list of users (ie. the sockets)
    let user_socket_list = Object.keys(room.sockets);

    // For each socket, get its associated username and populate the user_username_list
    let user_username_list = [];
    user_socket_list.forEach((user_socket) => {
      user_username_list.push(username_socket_pair[user_socket]);
    });

    callback(user_username_list);
  });

  // When a client has joined a race, emit an 'add_user' event to all other sockets in the room
  socket.on("joined_race", function (room_id, username) {
    io.to(room_id).emit("add_user", username);
  });

  // When a client has typed a new character, broadcast the event to the room as a progress update
  socket.on("keypress", function (room_id, username, percentComplete) {
    socket.broadcast
      .to(room_id)
      .emit("progress_update", username, percentComplete);
  });

  // When a client has finished a race
  socket.on(
    "finished_race",
    async function (room_id, username, wpm, excerpt_id, incorrect_count) {
      let rank = all_rooms[room_id].race_rank;

      let racesWon;
      let averageWPM;

      // Store the stats on the user's document in the database
      const user = await User.findOne(
        { username: username },
        "averageWPM racesCompleted racesWon"
      )
        .lean()
        .exec(async function (err, user) {
          if (err) {
            console.log("Error finding user");
            console.log(err);
          } else {
            racesWon = user.racesWon;

            // Increase their races won statistic by 1 if they were 1st place in the race
            if (rank == 1) {
              racesWon += 1;
            }

            // Calculate a new average WPM using the new wpm
            averageWPM = Math.floor(
              (Number(user.averageWPM) + Number(wpm)) / 2
            );

            await User.findOneAndUpdate(
              { username: username },
              {
                $set: {
                  averageWPM: averageWPM,
                  racesCompleted: user.racesCompleted + 1,
                  racesWon: racesWon,
                },
              }
            ).exec(function (err, result) {
              if (err) {
                console.log("Error updating user stats");
                console.log(err);
              } else {
                console.log("Successfully updated user stats");
              }
            });
          }
        });

      // Update the excerpt's leaderboard
      let leaderboard;
      let update_leaderboard = false;
      const excerpt = await Excerpt.findOne({ _id: excerpt_id }, "leaderboard")
        .lean()
        .exec(async function (err, excerpt) {
          if (err) {
            console.log("Error finding excerpt");
            console.log(err);
          } else {
            leaderboard = excerpt.leaderboard;

            // Get the current date in an appropriate format
            // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript#:~:text=Use%20new%20Date()%20to,var%20mm%20%3D%20String(today.
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, "0");
            let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            let yyyy = today.getFullYear();
            today = mm + "/" + dd + "/" + yyyy;

            // If the score is top 10 because there were less than 10 scores
            if (leaderboard.length < 10) {
              update_leaderboard = true;
              leaderboard.push([username, wpm, incorrect_count, today]);
              // If there were more than 10 scores, check if the current score is greater than any of the existing top 10
            } else if (leaderboard.length >= 10) {
              for (let i = 0; i < leaderboard.length; i++) {
                if (wpm > leaderboard[i][1]) {
                  update_leaderboard = true;
                  leaderboard.pop();
                  leaderboard.push([username, wpm, incorrect_count, today]);
                  break;
                }
              }
            }

            // Sort the leaderboard scores so that it is greatest to least based on WPM
            leaderboard.sort((a, b) => b[1] - a[1]);

            // Send the client's race stats to other users in the lobby
            io.in(room_id).emit(
              "update_race_stats",
              username,
              wpm,
              rank,
              incorrect_count,
              leaderboard
            );
            // Increase the race_rank counter
            all_rooms[room_id].race_rank++;

            // If it was a top 10 score, update the excerpt document in the database
            if (update_leaderboard) {
              await Excerpt.findOneAndUpdate(
                { _id: excerpt_id },
                {
                  $set: {
                    leaderboard: leaderboard,
                  },
                }
              ).exec(function (err, result) {
                if (err) {
                  console.log("Error updating excerpt leaderboard");
                  console.log(err);
                } else {
                  console.log("Successfully updated excerpt leaderboard");
                }
              });
            }
          }
        });
    }
  );
};
