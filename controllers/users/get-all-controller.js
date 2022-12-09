//** get all workers */

const pool = require("../../config");

exports.getAllWorkers = async (req, res) => {

  try {
    const AllWorkers = await pool.query(
      " SELECT utilisateur.*, salarie.salarie_id FROM utilisateur, salarie WHERE utilisateur.role = false AND utilisateur.utilisateur_id = salarie.utilisateur_id "
    );
    res.status(200).json({ "myUsers": AllWorkers.rows });
    // console.warn("get request", allUsers);
  } catch (error) {
    console.error(error.message);
  }

};

//** get all society */

exports.getAllSocieties = async (req, res) => {

  try {
    const allSocieties = await pool.query(
      "SELECT utilisateur.*,  entreprise.entreprise_id FROM utilisateur, entreprise WHERE utilisateur.role = true AND utilisateur.utilisateur_id = entreprise.utilisateur_id"
    );
    res.status(200).json({ "myUsers": allSocieties.rows });
    // console.warn("get request", allUsers);
  } catch (error) {
    console.error(error.message);
  }

};

//** get all users */

exports.getAllUsers = async (req, res) => {

  try {
    const allUsers = await pool.query(
      "SELECT * FROM utilisateur ORDER BY utilisateur_id ASC"
    );
    res.status(200).json({ "myUsers": allUsers.rows });
    // console.warn("get request", allUsers);
  } catch (error) {
    console.error(error.message);
  }

};
