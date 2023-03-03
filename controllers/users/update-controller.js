//** Update a worker */
const pool = require("../../config");
const bcrypt = require("bcrypt")
const validator = require("validator");
const { StatusCodes } = require("http-status-codes");
const { isEmail } = validator;

exports.updateWorker = async (req, res) => {


    //! Je vérifie si mon salarié existe par son email qui est unique */

    const { utilisateur_id } = req.salarie
    const { email } = req.salarie


    //** Je verifie le format de l'email via validator et isEmail */

    if (!isEmail(email)) {
        console.log("invalid email");
        res.status(StatusCodes.UNAUTHORIZED).json({ "email": email, "message": "invalid email" })
        return false
    }


    try {
        let emailExist = await pool.query("SELECT email FROM salarie WHERE email=$1 AND salarie_id<>$2", [email, utilisateur_id]);
        if (emailExist.rowCount !== 0) {
            res.status(StatusCodes.UNAUTHORIZED).json({ "message": "cet email est déjà utilisé" })
            return false
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.BAD_REQUEST).send(error.message)
    }


    try {
        const { utilisateur_id } = req.salarie
        const { civilite, nom, prenom, telephone, rue, cp, ville, email, nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance } = req.body;

        let { mdp } = req.salarie;
        const saltRounds = 12;
        let hash = await bcrypt.hash(mdp, saltRounds);
        mdp = hash

        const updateWorker = await pool.query(
            "UPDATE salarie SET civilite=$1,nom=$2,prenom=$3,telephone=$4,rue=$5,cp=$6,ville=$7,email=$8,nom_jeune_fille=$9,num_ss=$10, date_naissance=$11, lieu_naissance=$12,pays_naissance=$13 WHERE salarie_id = $14", [civilite, nom, prenom, telephone, rue, cp, ville, email, nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance, utilisateur_id]
        )
        res.status(StatusCodes.ACCEPTED).json({ "message": "Update done for the worker", "newDatas": req.body })

    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.BAD_REQUEST).send(error.message)
    }

}

//** Update a society */

exports.updateSociety = async (req, res) => {

    const { utilisateur_id } = req.entreprise
    const { email } = req.entreprise


    try {
        let emailExist = await pool.query("SELECT email FROM entreprise WHERE email=$1 AND entreprise_id<>$2", [email, utilisateur_id]);
        if (emailExist.rowCount !== 0) {
            res.status(StatusCodes.UNAUTHORIZED).json({ "message": "cet email est déjà utilisé" })
            return false
        }
    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.BAD_REQUEST).send(error.message)
    }


    try {
        const { utilisateur_id } = req.entreprise
        const { civilite, nom, prenom, telephone, rue, cp, ville, email, role, siret, raison_sociale, code_ape } = req.body;

        let { mdp } = req.salarie;
        const saltRounds = 12;
        let hash = await bcrypt.hash(mdp, saltRounds);
        mdp = hash

        const updateSociety = await pool.query(
            "UPDATE entreprise SET civilite=$1,nom=$2,prenom=$3,telephone=$4,rue=$5,cp=$6,ville=$7,email=$8,mdp=$9,role=$10,siret=$11,raison_sociale=$12, code_ape=$13 WHERE entreprise_id = $14", [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, siret, raison_sociale, code_ape, utilisateur_id]
        )

        res.status(StatusCodes.ACCEPTED).json({ "message": "Update done for the society", "newDatas": req.body })

    } catch (error) {
        console.error(error.message);
        res.status(StatusCodes.BAD_REQUEST).send(error.message)
    }
}
