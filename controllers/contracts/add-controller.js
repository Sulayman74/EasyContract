const { StatusCodes } = require("http-status-codes");
const pool = require("../../config");

//** Add a contract */

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
        res.status(200).json({ "message": "a contract has been added", "contract": addContract.rows[0], "salarie": salarie })
    } catch (error) {
        res.status(StatusCodes.FORBIDDEN).json({error : error.message})
    }
}