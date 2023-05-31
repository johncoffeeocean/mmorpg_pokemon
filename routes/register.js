/*
API route for handling account registration.
*/

const rateLimit = require("express-rate-limit");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const secret = process.env.JWT_SECRET;

const { User, AccountToken } = require("../db");

module.exports = (router) => {
  router.post(
    "/register",

    // Limit registration to 5 requests per hour
    rateLimit({
      windowMS: 60 * 60 * 1000,
      max: 5,
    }),

    // Validate username and password lengths
    [
      check("username").isString().isLength({ min: 3, max: 32 }),
      check("password").isString().isLength({ min: 5, max: 256 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);

      // If there are validation errors, return
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      const { username, password, email } = req.body;

      // If the username already exists, return
      if (await User.exists({ username })) {
        return res.status(423).json({ error: "Username already exists" });
      }

      // If the email already is in use, return
      if (await User.exists({ email })) {
        return res.status(423).json({ error: "Email already in use" });
      }

      // Convert password into passwordHash using bcrypt hashing
      const passwordHash = await bcrypt.hash(password, 10);
      const averageWPM = 0;
      const racesCompleted = 0;
      const racesWon = 0;

      // Create a new user in the database with given username, email, passwordHash
      const user = await User.create({
        username,
        passwordHash,
        email,
        averageWPM,
        racesCompleted,
        racesWon,
      });

      // Create an account verification token
      const accountToken = await AccountToken.create({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      // Send a account verification email to user
      const msg = {
        // For testing
        // to: 'kirkwong33@gmail.com',
        to: email,
        from: "typedash.register@gmail.com",
        subject: "Typedash Account Verification",
        html:
          "Hello " +
          username +
          "," +
          "<br><br>" +
          "Please verify your account by clicking the link: <br>" +
          // for testing
          // 'http://localhost:3000' +
          // for production
          "http://typedash.live" +
          "/verify/" +
          accountToken.token +
          "<br><br>" +
          "Thank you for your interest in playing Typedash. We hope that you enjoy your time here! <br><br>" +
          "Cheers,<br>" +
          "Typedash Team",
      };

      sgMail.send(msg).then(
        (response) => {
          console.log("Email successfully sent!");
        },
        (error) => {
          console.error(error);

          if (error.response) {
            console.error(error.response.body);
          }
        }
      );

      res.json({
        user: {
          _id: user._id,
          username: user.username,
        },
      });
    }
  );
};
