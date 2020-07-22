const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ msg: "Authentication details were not provided" });

  const onlyToken = token.slice(7, token.length);

  try {
    const decoded = jwt.decode(onlyToken);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ msg: "Token is invalid" });
  }
}