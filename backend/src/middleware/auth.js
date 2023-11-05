const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.auth = decodedToken;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: error || "You must be logged in to perform this action" });
  }
};
