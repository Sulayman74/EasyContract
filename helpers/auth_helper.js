
const jwt = require("jsonwebtoken")



function jwtTokens({ email, utilisateur_id, role }) {

    const user = { email, utilisateur_id, role };
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN)
    return accessToken
}
module.exports = {jwtTokens}


function verifyToken(req, res, next) {
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

