const pool = require("../../config");
const { StatusCodes } = require("http-status-codes");
exports.getContrats = async (req, res) => {

    const { utilisateur_id } = req.entreprise

    try {
        
        console.log(utilisateur_id);
        const salarie = await pool.query(
`
SELECT
	contrat.*, 
	entreprise.entreprise_id, 
	entreprise.civilite, 
	entreprise.nom, 
	entreprise.prenom, 
	entreprise.raison_sociale, 
	entreprise.utilisateur_id
FROM
	contrat
	INNER JOIN
	entreprise
	ON 
		contrat.fki_entreprise =$1
WHERE
entreprise.utilisateur_id =$1

`,[utilisateur_id]

        )
        res.status(StatusCodes.OK).json({ "reponse": salarie })
    } catch (error) {

        res.status(StatusCodes.BAD_REQUEST).json({ "error": error.message, "message": req.entreprise })
    }
}

// ! GET all contrat pour une entreprise
exports.getAllMyContratEntreprise = async (req, res) => {
    try {

        const { utilisateur_id } = req.entreprise
        console.log(utilisateur_id);
        const allContrat = await pool.query(`SELECT
        salarie.pays_naissance, 
        salarie.lieu_naissance, 
        salarie.date_naissance, 
        salarie.num_ss, 
        salarie.nom_jeune_fille, 
        salarie.salarie_id, 
        salarie.mdp, 
        salarie.email, 
        salarie.ville, 
        salarie.cp, 
        salarie.rue, 
        salarie.telephone, 
        salarie.prenom, 
        salarie.nom, 
        salarie.civilite, 
        salarie.utilisateur_id, 
        contrat.fki_entreprise, 
        contrat.contrat_id, 
        contrat.fki_salarie, 
        contrat.type_contrat, 
        contrat.is_fulltime, 
        contrat.date_debut, 
        contrat.remuneration, 
        contrat.statut, 
        contrat.fonction, 
        contrat.motif, 
        contrat.date_fin, 
        contrat.periode_essai 
       
    FROM
        salarie
        INNER JOIN
        contrat
        ON 
            contrat.fki_salarie = salarie.salarie_id
        INNER JOIN
        entreprise
        ON 
            contrat.fki_entreprise = entreprise.entreprise_id
    WHERE
        contrat.fki_entreprise = $1`, [utilisateur_id]);
        console.log(allContrat)
        res.json(allContrat.rows);
    } catch (err) {
        console.error(err.message)
        res.status(400).send("Server error")
    }
}