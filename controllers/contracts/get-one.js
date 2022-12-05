//** get one contract */

const pool = require("../../config");

exports.getOne = async(req,res)=>{
    try {
        const {id}=req.params
        const getOne = await pool.query(
            "SELECT contrat_id FROM contrat WHERE contrat_id=$1",[id]
        )
        res.status(200).json({"message":getOne})
    } catch (error) {
        console.error(error.message);
    }
}
