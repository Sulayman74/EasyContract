//** Get one Worker */

const pool = require("../../config")

exports.getWorker = async (req, res) => {

    const  {utilisateur_id}  = req.salarie
    console.log(utilisateur_id);
    try {
        
        const getWorker = await pool.query(
            "SELECT * FROM salarie WHERE salarie_id=$1", [utilisateur_id]
        );
        res.status(200).json({ "message": "You have chosen this worker", "worker": getWorker })

    } catch (error) {
        console.error(error.message);
        res.send(error)
    }
}

exports.getSociety = async (req, res) => {
    try {

        const { utilisateur_id } = req.entreprise
        const getSociety = await pool.query(
            "SELECT * FROM entreprise WHERE entreprise_id=$1", [utilisateur_id]
        );
        if (getSociety.rows.length === 0) return res.status(400).json({ error: "no society found" });
        
        res.status(200).json({ "message": `You have chosen this Society ${getSociety.rows[0].raison_sociale}`, "society": getSociety.rows[0] })

    } catch (error) {
        console.error(error.message);
        res.send(error)
    }
}

