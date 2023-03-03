// ** delete a contract */

const pool = require("../../config");
const { StatusCodes } = require('http-status-codes')

/**
 * Supprime un contrat dans la base de données
 * @param {Object} req - Objet requête
 * @param {Object} res - Objet réponse
 * @returns {Object} Message de confirmation et contrat supprimé
 */


exports.deleteContract = async (req, res) => {

    try {
        const { id } = req.params
        const test = req

        console.log("Je viens de delete contrat", test);
        const deleteWorker = await pool.query(
            "DELETE FROM contrat WHERE contrat_id=$1", [id]);

        res.status(StatusCodes.ACCEPTED).json({ "message": "a contract has been deleted", "contract": deleteWorker })
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}