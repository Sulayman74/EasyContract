// ** delete a contract */

const pool = require("../../config");

exports.deleteContract = async (req, res) => {

    try {
        const { id } = req.params
        const test = req
     
        console.log("Je viens de delete contrat", test);
        const deleteWorker = await pool.query(
            "DELETE FROM contrat WHERE contrat_id=$1", [id]);

        res.status(200).json({"message":"a contract has been deleted", "contract":deleteWorker})
    } catch (error) {
        console.error(error.message);
    }
}