//** Get one Worker */

const pool = require("../../config")

exports.getWorker = async (req, res) => {

    try {

        const { id } = req.params
        const getWorker = await pool.query(
            "SELECT * FROM salarie WHERE salarie_id=$1", [id]
        );
        res.status(200).json({ "message": "You have chosen this worker", "worker": getWorker.rows[0].nom + " " + getWorker.rows[0].prenom })

    } catch (error) {
        console.error(error.message);
    }
}

exports.getSociety = async (req, res) => {
    try {

        const { id } = req.params
        const getSociety = await pool.query(
            "SELECT * FROM entreprise WHERE entreprise_id=$1", [id]
        );
        if (getSociety.rows.length === 0) return res.status(400).json({ error: "no society found" });
        
        res.status(200).json({ "message": `You have chosen this Society ${getSociety.rows[0].raison_sociale}`, "society": getSociety.rows[0] })

    } catch (error) {
        console.error(error.message);
    }
}

