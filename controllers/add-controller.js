const pool = require("../config");

exports.addWorker = async (req, res) => {

    try {

        const { nom, prenom, telephone, rue, cp, ville, nom_jeune_fille, num_SS, date_naissance, lieu_naissance, email, mot_de_passe, role, date_connexion, date_deconnexion } = req.body
        const addWorker = await pool.query(
            "INSERT INTO salarie (nom,prenom,telephone,rue,cp,ville,nom_jeune_fille,num_SS,date_naissance,lieu_naissance,email,mot_de_passe,role,date_connexion,date_deconnexion) VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",
            [nom, prenom, telephone, rue, cp, ville, nom_jeune_fille, num_SS, date_naissance, lieu_naissance, email, mot_de_passe, role, date_connexion, date_deconnexion]
        );
        res.json(addWorker.rows[0])
        console.log('A worker has been added correctly', req.body);

    } catch (error) {
        console.error(message.error);

    }

}