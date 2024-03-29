//** Get one Worker */

const pool = require("../../config")
const { StatusCodes } = require("http-status-codes")

exports.getWorker = async (req, res) => {

    const { utilisateur_id } = req.salarie
    try {

        const getWorker = await pool.query(
            "SELECT * FROM salarie WHERE salarie_id=$1", [utilisateur_id]
        );
        if (getWorker.rows.length === 0) return res.status(400).json({ error: "no worker found" });

        res.status(StatusCodes.OK).json({ "message": "You have chosen this worker", "worker": getWorker.rows[0] })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}

exports.getSociety = async (req, res) => {


    const { utilisateur_id } = req.entreprise
    try {
        const getSociety = await pool.query(
            "SELECT * FROM entreprise WHERE entreprise_id=$1", [utilisateur_id]
        );
        if (getSociety.rows.length === 0) return res.status(400).json({ error: "no society found" });

        res.status(StatusCodes.OK).json({ "message": `You have chosen this Society ${getSociety.rows[0].raison_sociale}`, "society": getSociety.rows[0] })

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}

exports.getOneSalarie = async (req, res) => {
    const { id } = req.params
    try {
        const getOne = await pool.query(
            `SELECT * FROM salarie WHERE salarie_id = $1`, [id]
        )
        res.status(StatusCodes.OK).json({"salarie" : getOne.rows[0]})
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
    }
}