const pool = require("../../config");

//** Add a Worker */

exports.addWorker = async (req, res) => {
    try {

        // console.log(req.body);
        const { civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance } = req.body;

        const addWorker = await pool.query(
            "INSERT INTO salarie (civilite,nom,prenom,telephone,rue,cp,ville,email,mdp,role,nom_jeune_fille,num_ss, date_naissance, lieu_naissance,pays_naissance) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",
            [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, nom_jeune_fille, num_ss, date_naissance, lieu_naissance, pays_naissance]
        );
        res.status(200).json({ "addAWorker": addWorker.rows[0] })


    } catch (error) {
        console.error(error.message);

    }

}

//** Add a Society */

exports.addSociety = async (req, res) => {
    try {

        // console.log(req.body);
        const { civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, siret, raison_sociale, code_ape } = req.body;

        const addSociety = await pool.query(
            "INSERT INTO entreprise (civilite,nom,prenom,telephone,rue,cp,ville,email,mdp,role,siret,raison_sociale,code_ape) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *",
            [civilite, nom, prenom, telephone, rue, cp, ville, email, mdp, role, siret, raison_sociale, code_ape]
        );
        res.status(200).json({ "addASociety": addSociety.rows[0] })
        console.log('A Society has been added correctly', req.body);

    } catch (error) {
        console.error(error.message);

    }
}