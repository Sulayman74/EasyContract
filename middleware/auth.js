
const jwt = require("jsonwebtoken");
const { StatusCodes } = require('http-status-codes');


// Define a middleware function that uses the verifyToken function to
// authenticate requests

function authenticateToken(req, res, next) {
  const attr = 'authorization'

  const authHeader = req.headers[attr] //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(StatusCodes.BAD_REQUEST).json({ error: "not allowed null token" });


  try {

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.entreprise = decoded;
    req.salarie = decoded;

  } catch (err) {

    return res.status(StatusCodes.FORBIDDEN).json({ "catch": "Unauthorized", err: err });
  }
  return next();
}

module.exports = authenticateToken

