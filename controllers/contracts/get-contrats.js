const pool = require("../../config");
const { StatusCodes } = require("http-status-codes");
exports.getContrats = async (req, res) => {

    const { utilisateur_id } = req.entreprise

    try {
        console.log(utilisateur_id);
        const salarie = await pool.query(
`
SELECT
	contrat.*, 
	entreprise.entreprise_id, 
	entreprise.civilite, 
	entreprise.nom, 
	entreprise.prenom, 
	entreprise.raison_sociale, 
	entreprise.utilisateur_id
FROM
	contrat
	INNER JOIN
	entreprise
	ON 
		contrat.fki_entreprise =$1
WHERE
entreprise.utilisateur_id =$1

`,[utilisateur_id]

        )
        res.status(StatusCodes.OK).json({ "reponse": salarie })
    } catch (error) {

        res.status(StatusCodes.BAD_REQUEST).json({ "error": error.message, "message": req.entreprise })
    }
}