const { StatusCodes } = require("http-status-codes");
const pool = require("../../config");

//** Add a contract */

/**
 * Cette fonction permet d'ajouter un contrat dans la base de données.
 * Elle récupère les informations sur le contrat à partir des données envoyées via la requête HTTP et les insère dans la table Contrat.
 * Elle renvoie ensuite un message confirmant que le contrat a été ajouté et renvoie les informations sur le contrat et sur le salarié concerné.
 * En cas d'erreur, un message d'erreur personnalisé est renvoyé grâce au trigger de la base de données.
 *
 * @async
 * @param {Object} req - Objet contenant les informations sur la requête HTTP.
 * @param {Object} res - Objet contenant les informations sur la réponse HTTP.
 * @returns {json} - Informations sur le contrat et sur le salarié ajoutés.
 */

exports.addContract = async (req, res) => {


    try {

        const { fki_entreprise, fki_salarie, type_contrat, is_fulltime, date_debut, date_fin, periode_essai, motif, remuneration, fonction, statut } = req.body;
        const addContract = await pool.query(
            "INSERT INTO contrat (fki_entreprise,fki_salarie,type_contrat,is_fulltime,date_debut,date_fin,periode_essai,motif, remuneration,fonction,statut) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *", [fki_entreprise, fki_salarie, type_contrat, is_fulltime, date_debut, date_fin, periode_essai, motif, remuneration, fonction, statut]
        )
        const salarie = await pool.query(`SELECT
        contrat.*, 
        contrat.fki_entreprise, 
        salarie.civilite, 
        salarie.nom
    FROM
        contrat
        INNER JOIN
        salarie
        ON 
            contrat.fki_salarie = salarie.salarie_id`)
        res.status(StatusCodes.CREATED).json({ "message": "a contract has been added", "contract": addContract.rows[0], "salarie": salarie })
    } catch (error) {
        // * ici grâce à mon trigger, mon message d'erreur est personnalisé et vient de ma bdd.
        res.status(StatusCodes.FORBIDDEN).json({ error: error.message })
    }
}