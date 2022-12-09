const SECRET = "0987654321"
const jwt = require("jsonwebtoken")

function verifyToken(req, res, next){
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(403).send("Forbidden");
    }

    // console.log(req.headers)
    token = token.split(" ")[1]

    try {
        const decoded = jwt.verify(token, SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Unauthorized");
    }
    return next();
}

module.exports = verifyToken