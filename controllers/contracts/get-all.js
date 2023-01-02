// ** get all the contracts */

const pool = require("../../config");

exports.getAll = async (req, res) => {

    try {
        const test = req.body
        console.log(test);
        const allContracts = await pool.query(
            "SELECT contrat.contrat_id, contrat.type_contrat, contrat.is_fulltime, contrat.date_debut, contrat.date_fin, contrat.periode_essai, contrat.motif, contrat.fonction, contrat.statut,entreprise.entreprise_id, entreprise.raison_sociale,entreprise.civilite,entreprise.nom, entreprise.prenom, salarie.salarie_id, salarie.num_ss, salarie.civilite, salarie.nom, salarie.prenom FROM contrat INNER JOIN entreprise ON contrat.fki_entreprise = entreprise.entreprise_id INNER JOIN salarie ON contrat.fki_salarie = salarie.salarie_id WHERE contrat.fki_entreprise = entreprise.entreprise_id AND contrat.fki_salarie = salarie.salarie_id"
        );
        res.status(200).json({ "message": "All the Contracts", "contracts": allContracts.rows })

    } catch (error) {
        console.error(error.message);
    }
}