//** get all workers */

const pool = require("../../config");

exports.getAllWorkers = async (req, res) => {

  try {
    const AllWorkers = await pool.query(
      "SELECT utilisateur.* FROM utilisateur WHERE utilisateur.role = false"
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
      "SELECT utilisateur.* FROM utilisateur WHERE utilisateur.role = true"
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
