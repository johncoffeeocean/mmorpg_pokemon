const express = require("express");
const router = express.Router();
const db = require("../src/db");

// GET all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM tbl_users", (error, results) => {
    if (error) throw error;

    res.send(results);
  });
});

// GET a single user
router.get("/:id", (req, res) => {
  db.query(
    `SELECT * FROM tbl_users WHERE id=${req.params.id}`,
    (error, results) => {
      if (error) throw error;

      res.send(results);
    }
  );
});

// CREATE a new user
router.post("/", (req, res) => {
  const { name, email } = req.body;

  db.query("INSERT INTO tbl_users SET ?", { name, email }, (error, results) => {
    if (error) throw error;

    res.send("User added successfully.");
  });
});

// UPDATE an existing user
router.put("/:id", (req, res) => {
  const { name, email } = req.body;

  db.query(
    `UPDATE tbl_users SET name='${name}', email='${email}' WHERE id=${req.params.id}`,
    (error, results) => {
      if (error) throw error;

      res.send("User updated successfully.");
    }
  );
});

// DELETE a user
router.delete("/:id", (req, res) => {
  db.query(`DELETE FROM users WHERE id=${req.params.id}`, (error, results) => {
    if (error) throw error;

    res.send("User deleted successfully.");
  });
});

module.exports = router;
