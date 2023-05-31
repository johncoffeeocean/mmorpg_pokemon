const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const secret = process.env.JWT_SECRET;

const db = require("../db");
module.exports = (router) => {
  router.post(
    "/getbaseitems",

    (req, res) => {
      const { name, id_shop, type, price, desc } = req.body;

      db.query(
        `SELECT * FROM tbl_base_items WHERE name LIKE '${name}' OR type LIKE '${type}' OR price LIKE '${price}' OR desc LIKE '${desc}' `,
        async (error, results) => {
          if (error) throw error;
          console.log(results.length);
          if (!results) {
            res.send({ msg: "No any Items" });
            return;
          }

          console.log("asdf");
          res.send(results);
        }
      );
    }
  );
};
