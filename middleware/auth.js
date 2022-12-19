
const jwt = require("jsonwebtoken");
const {StatusCodes}= require('http-status-codes');


// Define a middleware function that uses the verifyToken function to
// authenticate requests
function authenticateToken(req, res, next) {
  
  const authHeader = req.header('authorization'); //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(StatusCodes.BAD_REQUEST).json({ error: "not allowed null token" });


  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
} catch (err) {
    return res.status(StatusCodes.FORBIDDEN).send("Unauthorized");
}
return next();
}

module.exports = authenticateToken

