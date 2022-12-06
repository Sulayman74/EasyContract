const pool = require("../../config");

exports.getSpecial = async (req, res) => {
    try {

        const getOne = await pool.query(
            "SELECT contrat.*, salarie.civilite,salarie.nom,salarie.prenom,salarie.nom_jeune_fille, salarie.salarie_id,salarie.num_ss,entreprise.civilite,entreprise.nom,entreprise.siret,entreprise.raison_sociale,entreprise.entreprise_id FROM contrat INNER JOIN salarie ON contrat.fki_salarie = salarie.salarie_id INNER JOIN entreprise ON contrat.fki_entreprise = entreprise.entreprise_id"
        )
        res.status(200).json({ "message": 'You have chosen this contrat', "the contract": getOne })
    } catch (error) {
        console.error(error.message);
    }
}

