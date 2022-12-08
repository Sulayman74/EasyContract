//** Update a worker */
const pool = require("../../config");
const bcrypt = require("bcrypt")
const validator = require("validator")
const { isEmail } = validator;

exports.updateWorker = async (req, res) => {


    //! Je vérifie si mon salarié existe par son email qui est unique */

    const { email } = req.body

    let worker = await pool.query("SELECT email FROM salarie WHERE email=$1", [email])

    //** Je verifie le format de l'email via validator et isEmail */
    if (!isEmail(email)) {
        console.log("invalid email");
        res.status(402).json({ "email": email, "message": "invalid email" })
        return false
    } else {

        try {
            const { id } = req.params
            const { civilite, nom, prenom, telephone, rue, cp, ville, email, role, nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance } = req.body;

            let { mdp } = req.body;
            const saltRounds = 12;
            let hash = await bcrypt.hash(mdp, saltRounds);
            mdp = hash


            const updateWorker = await pool.query(
                "UPDATE salarie SET civilite=$1,nom=$2,prenom=$3,telephone=$4,rue=$5,cp=$6,ville=$7,email=$8,mdp=$9,role=$10,nom_jeune_fille=$11,num_ss=$12, date_naissance=$13, lieu_naissance=$14,pays_naissance=$15 WHERE salarie_id = $16", [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance, id]
            )
            res.status(200).json({ "message": "Update done for the worker", "newDatas": updateWorker })

        } catch (error) {
            console.error(error.message);
        }
    }
}

//** Update a society */

exports.updateSociety = async (req, res) => {

    try {
        const { id } = req.params
        const { civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, siret, raison_sociale, code_ape } = req.body;
        const updateSociety = await pool.query(
            "UPDATE entreprise SET civilite=$1,nom=$2,prenom=$3,telephone=$4,rue=$5,cp=$6,ville=$7,email=$8,mdp=$9,role=$10,siret=$11,raison_sociale=$12, code_ape=$13 WHERE entreprise_id = $14", [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, siret, raison_sociale, code_ape, id]
        )

        res.status(200).json({ "message": "Update done for the society", "newDatas": updateSociety })

    } catch (error) {
        console.error(error.message);
    }
}
