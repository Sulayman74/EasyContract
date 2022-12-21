
const jwt = require("jsonwebtoken")



function jwtTokens({ email, utilisateur_id, role, mdp }) {

    const user = { email, utilisateur_id, role, mdp };
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN)
    return accessToken
}
module.exports = {jwtTokens}

