// ** register a worker */

const pool = require("../../config");
const bcrypt = require("bcrypt")
const validator = require("validator")
const { isEmail } = validator;

exports.registerWorker = async (req, res) => {

    //! Je vérifie si mon salarié existe par son email qui est unique */

    const { email } = req.body

    let worker = await pool.query("SELECT email FROM salarie WHERE email=$1", [email]);

    //** Je verifie le format de l'email via validator et isEmail */
    if (!isEmail(email)) {
        console.log("invalid email");
        res.status(402).json({ "email": email, "message": "invalid email" })
        return false
    }

    if (worker.rowCount !== 0) {

        console.log("Can not add this worker");
        res.status(401).json({ "email": email, "message": "email already exists" })
        return false
    } else {
        //** Ensuite je créé s'il n'existe pas */
        try {

            const { civilite, nom, prenom, telephone, rue, cp, ville, email, role, nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance } = req.body;

            //** ---- hash du mot de passe via bcrypt */

            let { mdp } = req.body;
            const saltRounds = 12;
            let hash = await bcrypt.hash(mdp, saltRounds);
            mdp = hash

            const registerWorker = await pool.query(
                "INSERT INTO salarie (civilite,nom,prenom,telephone,rue,cp,ville,email,mdp,role,nom_jeune_fille,num_ss, date_naissance, lieu_naissance,pays_naissance) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",
                [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance]
            );
            res.status(200).json({ "registerAWorker": registerWorker.rows[0] })

        } catch (error) {
            console.error(error.message);

        }
    }


}



//! ---------------------------------------------------- */

//** Register a Society */

exports.registerSociety = async (req, res) => {

    //! Je vérifie si mon entreprise existe par son email,siret qui est unique */

    const { siret, email } = req.body
    let society = await pool.query("SELECT siret,email FROM entreprise WHERE siret=$1 AND email=$2", [siret, email])

    //** Je verifie le format de l'email via validator et isEmail */
    if (!isEmail(email)) {
        console.log("invalid email");
        res.status(402).json({ "email": email, "message": "invalid email" })
        return false
    }

    if (society.rowCount !== 0) {
        console.log("Can not add this society");
        res.status(400).json({ "siret": siret, "email": email, "message": "society already exists" })
        return false
    }
    //! ---------------------------------------------------- */
    //** Ensuite je créé s'il n'existe pas */

    try {


        const { civilite, nom, prenom, telephone, rue, cp, ville, email, role, siret, raison_sociale, code_ape } = req.body;

        //** ---- hash du mot de passe via bcrypt */
        const saltRounds = 12;
        let { mdp } = req.body;
        let hash = await bcrypt.hash(mdp, saltRounds);
        mdp = hash


        const addSociety = await pool.query(
            "INSERT INTO entreprise (civilite,nom,prenom,telephone,rue,cp,ville,email,mdp,role,siret,raison_sociale,code_ape) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
            [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, siret, raison_sociale, code_ape]
        );
        res.status(200).json({ "addASociety": addSociety.rows[0] })
        console.log('A Society has been added correctly');

    } catch (error) {
        console.error(error.message);

    }
}
