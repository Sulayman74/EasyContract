//** get one contract */

const pool = require("../../config");
const { StatusCodes } = require('http-status-codes')


/**
 * getOne
 * Route handler for getting a single contrat
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

exports.getOne = async (req, res) => {
    try {
        const { id } = req.params
        const getOne = await pool.query(
            "SELECT contrat_id FROM contrat WHERE contrat_id=$1", [id]
        )
        res.status(StatusCodes.OK).json({ "message": `You have chosen this contrat$ ${id}`, "the contract": getOne })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}
