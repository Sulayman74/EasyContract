
const jwt = require("jsonwebtoken");


// Define a middleware function that uses the verifyToken function to
// authenticate requests
function authenticateToken(req, res, next) {
  const authHeader = req.header('authorization'); //Bearer TOKEN
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).json({ error: "null token" });
  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {

    if (error) return res.status(403).json({ error: messge });
    req.user = user
    next();
  })
}

module.exports = authenticateToken

// // Use the authenticate middleware on the /users route
// app.get('/users', authenticateToken, (req, res) => {
//   // If the request reaches this point, it means that the token was
//   // successfully verified and the user is authenticated
//   res.json({
//     user: req.user
//   });
// });
