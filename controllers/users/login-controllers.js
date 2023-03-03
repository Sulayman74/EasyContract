const pool = require("../../config");
const validator = require("validator")
const { isEmail } = validator;
const bcrypt = require("bcrypt");
const { jwtTokens } = require('../../helpers/auth_helper')
const { StatusCodes } = require('http-status-codes')




exports.loginSalarie = async (req, res) => {

    try {

        const { email, mdp } = req.body;
        const login = await pool.query("SELECT * FROM salarie WHERE email=$1", [email]);
        //** Je verifie le format de l'email via validator et isEmail */

        if (!isEmail(email)) {
            console.log("invalid email");
            res.status(StatusCodes.UNAUTHORIZED).json({ "email": email, error: "invalid email" })
            return false
        }
        if (login.rows.length === 0) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Email is incorrect" });

        // else if (login.rows.length !== 0) res.status(200).json({ message: "You are welcome" });

        // //? ------------je vérifie son password hashed et son password en claire ------------- ** /

        const clearPassword = await login.rows[0].mdp
        const validPassword = await bcrypt.compare(mdp, clearPassword);
        if (!validPassword) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Wrong password" })

        const user = { email: login.rows[0].email, utilisateur_id: login.rows[0].salarie_id, role: login.rows[0].role, mdp: login.rows[0].mdp }

        // TODO ------------- le JWT --------------------- //

        let token = jwtTokens(user)
        // console.log({ "token": tokens });
        res.status(StatusCodes.ACCEPTED).json({ "token": token, "datas": user, message: "You are welcome" })
    }
    catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message, "message": "l'erreur token" })
    }


}


exports.loginSociety = async (req, res) => {

    try {

        const { email, mdp } = req.body;
        const login = await pool.query("SELECT * FROM entreprise WHERE email=$1", [email]);
        //** Je verifie le format de l'email via validator et isEmail */

        if (!isEmail(email)) {
            console.log("invalid email");
            res.status(StatusCodes.UNAUTHORIZED).json({ "email": email, "message": "invalid email" })
            return false
        }
        if (login.rows.length === 0) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Email is incorrect" });

        // //? ------------je vérifie son password hashed et son password en claire ------------- ** /

        const clearPassword = await login.rows[0].mdp
        const validPassword = await bcrypt.compare(mdp, clearPassword);
        if (!validPassword) return res.status(StatusCodes.UNAUTHORIZED).json({ error: "wrong password" })

        const society = { email: login.rows[0].email, utilisateur_id: login.rows[0].entreprise_id, role: login.rows[0].role, mdp: login.rows[0].mdp }

        // TODO ------------- le JWT --------------------- //

        let token = jwtTokens(society)
        res.status(StatusCodes.ACCEPTED).json({ "token": token, "datas": society, message: "You are welcome" })
    }
    catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message, "message": "l'erreur tokens" })
    }


}