const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const secret = process.env.JWT_SECRET;

const db = require("../db");
module.exports = (router) => {
  router.post(
    "/login",

    (req, res) => {
      const { username, password } = req.body;
      // Find a user in database based on the username given
      db.query(
        `SELECT * FROM tbl_users WHERE username='${username}'`,
        async (error, results) => {
          if (error) throw error;
          console.log(results.length);
          if (!results) {
            res.send({ msg: "Incorrect username or password" });
            return;
          }
          if (results.length == 0) {
            res.send({ msg: "Incorrect username or password" });
            return;
          }
          // Compare the passwordHash with the password using bcrypt
          const user = results[0];
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            res.send({ msg: "Incorrect password" });
            return;
          }

          const token = jwt.sign(
            {
              userId: user.id,
            },
            secret
          );
          delete user.password;
          res.send({
            token,
            user,
          });
        }
      );

      // If the user complete email verification yet, return
      //   if (!user.isVerified) {
      //     return res
      //       .status(401)
      //       .send({ msg: "Your account has not been verified." });
      //   }
    }
  );
};
