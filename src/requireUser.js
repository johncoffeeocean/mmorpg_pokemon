const { User } = require("./db");

module.exports = async (req, res, next) => {
  const { userId } = req.payload;

  const user = await User.findOne({ _id: userId }, "_id username")
    .lean()
    .exec();

  if (user) {
    req.user = user;
    return next();
  }

  // No valid token
  res.status(403).json({ error: "User not found" });
};
