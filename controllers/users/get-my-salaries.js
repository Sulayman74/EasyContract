const pool = require('../../config')
const {StatusCodes} = require('http-status-codes')

exports.getMyWorkers = async (req,res) => {

    const {utilisateur_id} = req.entreprise
    try {
        
const getMyWorkers = await pool.query(
    
    `
    SELECT
	salarie.*, 
	entreprise.entreprise_id, 
	entreprise.raison_sociale, 
	contrat.contrat_id, 
	contrat.fki_entreprise, 
	contrat.fki_salarie, 
	contrat.statut, 
	contrat.fonction, 
	contrat.remuneration
FROM
	contrat
	INNER JOIN
	salarie
	ON 
		contrat.fki_salarie = salarie.salarie_id
	INNER JOIN
	entreprise
	ON 
		contrat.fki_entreprise = entreprise.entreprise_id
        WHERE
        contrat.fki_entreprise = $1`, [utilisateur_id]);
        res.status(StatusCodes.OK).json({"datas worker": getMyWorkers.rows})


    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({error :error.message}).send(error)
    }
}