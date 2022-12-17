
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
    return res.status(StatusCodes.FORBIDDEN).json({error : err.message,"detail": "Unauthorized"});
}
return next();

  // jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {

  //   if (error) return res.status(StatusCodes.FORBIDDEN).json({ error: "Forbidden" });
  //   req.user = user
  //   next();
  // })
}

module.exports = {authenticateToken}

// function verifyToken(req, res, next) {
//   let token = req.headers["authorization"];

//   if (!token) {
//       return res.status(403).send("Forbidden");
//   }

//   // console.log(req.headers)
//   token = token.split(" ")[1]

//   try {
//       const decoded = jwt.verify(token, SECRET);
//       req.user = decoded;
//   } catch (err) {
//       return res.status(401).send("Unauthorized");
//   }
//   return next();
// }

// module.exports = verifyToken