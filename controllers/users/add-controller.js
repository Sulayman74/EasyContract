//TODO pouvoir ajouter des salariés coté entreprise et/ou une entreprise sans passer par le register features au cas où... //

const pool = require("../../config");
const bcrypt = require("bcrypt")
const validator = require("validator")
const { isEmail } = validator;
const {jwtTokens} = require('../../helpers/auth_helper')
const {StatusCodes} = require("http-status-codes");

//** Add a Worker */

exports.addWorker = async (req, res) => {

    //! Je vérifie si mon salarié existe par son email qui est unique */

    const { email } = req.body

    let worker = await pool.query("SELECT email FROM salarie WHERE email=$1", [email])

    //** Je verifie le format de l'email via validator et isEmail */
    if (!isEmail(email)) {
        console.log("invalid email");
        res.status(StatusCodes.UNAUTHORIZED).json({ "email": email, "message": "invalid email" })
        return false
    }

    if (worker.rowCount !== 0) {

        console.log("Can not add this worker");
        res.status(StatusCodes.UNAUTHORIZED).json({ "email": email, "message": "email already exists" })
        return false
    } else {
        //** Ensuite je créé s'il n'existe pas */
        try {

            const { civilite, nom, prenom, telephone, rue, cp, ville, email,nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance } = req.body;

            //** ---- hash du mot de passe via bcrypt */

            let { mdp } = req.body;
            const saltRounds = 12
            let hash = await bcrypt.hash(mdp, saltRounds);
            mdp = hash

            const worker = { email: req.body.email, utilisateur_id: req.body.utilisateur_id, role: req.body.role }
            // TODO ------------- le JWT --------------------- //
    
            let tokens = jwtTokens(worker)
        
            const addWorker = await pool.query(
                "INSERT INTO salarie (civilite,nom,prenom,telephone,rue,cp,ville,email,mdp,nom_jeune_fille,num_ss, date_naissance, lieu_naissance,pays_naissance) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *",
                [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp,nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance]
            );


            res.status(StatusCodes.OK).json({ "addAWorker": addWorker.rows[0],"tokens": tokens, "datas": worker, message: "A worker has been added" })


        } catch (error) {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request" + message })

        }
    }


}


//** Add a Society */

exports.addSociety = async (req, res) => {

    //! Je vérifie si mon entreprise existe par son email,siret qui est unique */

    const { siret, email } = req.body
    // console.log(siret, email);
    let society = await pool.query("SELECT siret,email FROM entreprise WHERE siret=$1 AND email=$2", [siret, email])
    //** Je verifie le format de l'email via validator et isEmail */
    if (!isEmail(email)) {
        console.log("invalid email");
        res.status(StatusCodes.UNAUTHORIZED).json({ "email": email, "message": "invalid email" })
        return false
    }


    if (society.rowCount !== 0) {
        console.log("Can not add this society");
        res.status(StatusCodes.UNAUTHORIZED).json({ "siret": siret, "email": email, "message": "society already exists" })
        return false
    }
    //! ---------------------------------------------------- */
    //** Ensuite je créé s'il n'existe pas */

    try {

        // console.log(req.body);
        const { civilite, nom, prenom, telephone, rue, cp, ville, email, siret, raison_sociale, code_ape } = req.body;

        //** ---- hash du mot de passe via bcrypt */

        let { mdp } = req.body;
        const saltRounds = 12;
        let hash = await bcrypt.hash(mdp, saltRounds);
        mdp = hash

        const society = { email: req.body.email, utilisateur_id: req.body.utilisateur_id, role: req.body.role }
        // TODO ------------- le JWT --------------------- //

        let tokens = jwtTokens(society)
  
        const addSociety = await pool.query(
            "INSERT INTO entreprise (civilite,nom,prenom,telephone,rue,cp,ville,email,mdp,siret,raison_sociale,code_ape) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *",
            [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, siret, raison_sociale, code_ape]
        );
        res.status(StatusCodes.OK).json({ "addASociety": addSociety.rows[0], "tokens": tokens, "datas": society, message: "A Society has been added correctly" })

    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request" })

    }
}
