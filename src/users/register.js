const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const secret = process.env.JWT_SECRET;

const db = require("../db");

module.exports = (router) => {
  router.post(
    "/register",

    (req, res) => {
      let { username, password, email, gender } = req.body;

      db.query(
        `SELECT * FROM tbl_users WHERE email='${email}' or username='${username}'`,
        async (error, results) => {
          if (error) throw error;
          console.log(results.length);
          if (results.length > 0) {
            res.json({ error: "Username or email already exists" });
            return;
          }

          const pass = password;
          password = await bcrypt.hash(pass, 10);
          console.log(pass, password);
          const state = 1; // 1; enable 2:suspended

          db.query(
            "INSERT INTO tbl_users SET ?",
            { username, email, password, state },
            (error, results) => {
              if (error) throw error;

              const accountToken = crypto.randomBytes(16).toString("hex");
              const user = results[0];
              // Send a account verification email to user
              // const msg = {
              //   // For testing
              //   // to: 'kirkwong33@gmail.com',
              //   to: email,
              //   from: "typedash.register@gmail.com",
              //   subject: "Typedash Account Verification",
              //   html:
              //     "Hello " +
              //     username +
              //     "," +
              //     "<br><br>" +
              //     "Please verify your account by clicking the link: <br>" +
              //     // for testing
              //     "http://localhost:3000" +
              //     // for production
              //     //   "http://typedash.live" +
              //     "/verify/" +
              //     accountToken +
              //     "<br><br>" +
              //     "Thank you for your interest in playing Typedash. We hope that you enjoy your time here! <br><br>" +
              //     "Cheers,<br>" +
              //     "Typedash Team",
              // };

              // sgMail.send(msg).then(
              //   (response) => {
              //     console.log("Email successfully sent!");
              //   },
              //   (error) => {
              //     console.error(error);

              //     if (error.response) {
              //       console.error(error.response.body);
              //     }
              //   }
              // );

              // res.json({
              //   user: {
              //     id: user.id,
              //     username: user.username,
              //   },
              // });

              res.send("User added successfully.");
            }
          );
        }
      );
    }
  );
};
