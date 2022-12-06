// ** get all the contracts */

const pool = require("../../config");

exports.getAll = async (req,res) => {

    try {
        
const allContracts = await pool.query(
    "SELECT * FROM contrat"
);
res.status(200).json({"message":"All the Contracts", "contracts":allContracts.rows})

    } catch (error) {
        console.error(error.message);
    }
}