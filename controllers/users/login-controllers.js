const pool = require("../../config");
const validator = require("validator")
const { isEmail } = validator;
const verifyToken = require("../../middleware/auth_middleware")

exports.loginSalarie = async (req, res) => {


    let { email, mdp } = req.body;

    const login = await pool.query("SELECT email FROM salarie WHERE email=$1", [email]);
    //** Je verifie le format de l'email via validator et isEmail */

    if (!isEmail(email)) {
        console.log("invalid email");
        res.status(402).json({ "email": email, "message": "invalid email" })
        return false
    }

    if (login.rowCount !== 0) {

        console.log("Can not add this worker");
        res.status(401).json({ "email": email, "message": "email already exists" })
        return false
    }

    if (!login) {
        return [false, "wrong credentials, no email existing"];
    }


    if (login.mdp !== mdp) {
        return [false, "wrong credentials, wrong password"]
    }

    //create the token
    const token = jwt.sign(
        {
            email,
            mdp
        },
        SECRET,
        {
            expiresIn: "100h",
        }
    )

    login.token = token
    res.status(200).json({ "login": login, "token": token })
}