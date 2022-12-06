const pool = require("../../config");

//** Add a contract */

exports.addContract = async (req, res) => {


    try {

        const { fki_entreprise, fki_salarie, type_contrat, is_fulltime, date_debut, date_fin, periode_essai, motif, fonction, statut } = req.body;

        const addContract = await pool.query(
            "INSERT INTO contrat (fki_entreprise,fki_salarie,type_contrat,is_fulltime,date_debut,date_fin,periode_essai,motif,fonction,statut) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *", [fki_entreprise, fki_salarie, type_contrat, is_fulltime, date_debut, date_fin, periode_essai, motif, fonction, statut]
        )
        res.status(200).json({ "message": "a contract has been added", "contract": addContract.rows[0] })

    } catch (error) {
        console.error(error.message);
    }
}