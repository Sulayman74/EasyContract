
const jwt = require("jsonwebtoken")



function jwtTokens({ email, utilisateur_id, role, mdp }) {

    const user = { email, utilisateur_id, role, mdp };
    const access_Token = jwt.sign(user, process.env.ACCESS_TOKEN)

    // **TODO JE DEVRAIS AJOUTER UN TEMPS D'EXPIRATION POUR LE TOKEN ET PENSER À FAIRE UN REFRESH TOKEN const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: "20m"})*/

    return access_Token
}
module.exports = { jwtTokens }

