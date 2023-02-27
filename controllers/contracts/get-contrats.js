const pool = require("../../config");
const { StatusCodes } = require("http-status-codes");


// ! GET all contrat pour une entreprise
exports.getAllMyContratEntreprise = async (req, res) => {
    try {

        const { utilisateur_id } = req.entreprise
        const allContrat = await pool.query(`SELECT
        salarie.pays_naissance, 
        salarie.lieu_naissance, 
        salarie.date_naissance, 
        salarie.num_ss, 
        salarie.nom_jeune_fille, 
        salarie.salarie_id, 
        salarie.mdp, 
        salarie.email, 
        salarie.ville, 
        salarie.cp, 
        salarie.rue, 
        salarie.telephone, 
        salarie.prenom, 
        salarie.nom, 
        salarie.civilite, 
        salarie.utilisateur_id, 
        contrat.fki_entreprise, 
        contrat.contrat_id, 
        contrat.fki_salarie, 
        contrat.type_contrat, 
        contrat.is_fulltime, 
        contrat.date_debut, 
        contrat.remuneration, 
        contrat.statut, 
        contrat.fonction, 
        contrat.motif, 
        contrat.date_fin, 
        contrat.periode_essai 
       
    FROM
        salarie
        INNER JOIN
        contrat
        ON 
            contrat.fki_salarie = salarie.salarie_id
        INNER JOIN
        entreprise
        ON 
            contrat.fki_entreprise = entreprise.entreprise_id
    WHERE
        contrat.fki_entreprise = $1`, [utilisateur_id]);
        res.status(StatusCodes.OK).json(allContrat.rows);
    } catch (err) {
        console.error(err.message)
        res.status(StatusCodes.BAD_REQUEST).send(err.message)
    }
}