//** delete a worker */

const pool = require("../../config");

exports.deleteWorker = async (req, res) => {

    try {
        const { id } = req.params
        console.log(req.params);
        const deleteWorker = await pool.query(
            "DELETE FROM salarie WHERE salarie_id=$1", [id]);

        res.status(200).json({"message":"a worker has been deleted", "user":deleteWorker})
    } catch (error) {
        console.error(error.message);
    }
}

//** delete a society */

exports.deleteSociety = async (req, res) => {

    try {
        const { id } = req.params
        console.log(req.params);
        const deleteSociety = await pool.query(
            "DELETE FROM entreprise WHERE entreprise_id=$1", [id]);

        res.status(200).json({"message":"a society has been deleted", "user":deleteSociety})
    } catch (error) {
        console.error(error.message);
    }
    
}