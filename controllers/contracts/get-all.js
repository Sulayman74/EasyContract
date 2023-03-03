// ** get all the contracts */

const pool = require("../../config");
const { StatusCodes } = require('http-status-codes')



/**
 * @function getAll
 * 
 * @description Récupère une liste complète des contrats avec leurs informations associées depuis la base de données
 * 
 * @param {Object} req Requête http
 * @param {Object} res Réponse http
 * 
 * @returns {Object} Objet contenant un message et une liste des contrats
*/

exports.getAll = async (req, res) => {

    try {
        const allContracts = await pool.query(
            "SELECT contrat.contrat_id, contrat.type_contrat, contrat.is_fulltime, contrat.date_debut, contrat.date_fin, contrat.periode_essai, contrat.motif, contrat.fonction, contrat.statut,entreprise.entreprise_id, entreprise.raison_sociale,entreprise.civilite,entreprise.nom, entreprise.prenom, salarie.salarie_id, salarie.num_ss, salarie.civilite, salarie.nom, salarie.prenom FROM contrat INNER JOIN entreprise ON contrat.fki_entreprise = entreprise.entreprise_id INNER JOIN salarie ON contrat.fki_salarie = salarie.salarie_id WHERE contrat.fki_entreprise = entreprise.entreprise_id AND contrat.fki_salarie = salarie.salarie_id"
        );
        res.status(StatusCodes.OK).json({ "message": "All the Contracts", "contracts": allContracts.rows })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}