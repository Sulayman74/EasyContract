const pool = require("../../config");
const {StatusCodes} = require("http-status-codes");
exports.getContrats = async (req, res)=> {

    const {user_id} = req.salarie

    try {
        const salarie = await pool.query(
            `
            SELECT
	salarie.*, 
	contrat.*
FROM
	salarie
	INNER JOIN
	contrat
	ON 
		salarie.salarie_id = $1
            `,[user_id]
        )
        res.status(StatusCodes.OK).json({"reponse" : salarie})
    } catch (error) {
       res.status(StatusCodes.BAD_REQUEST).json({error})
    }
}