//** get all users */

const pool = require("../../config");

exports.getAllUsers = async (req, res) => {

  try {
    const allUsers = await pool.query(
      "SELECT * FROM utilisateur ORDER BY utilisateur_id ASC"
    );
    res.status(200).json({"myUsers":allUsers.rows});
    // console.warn("get request", allUsers);
  } catch (error) {
    console.error(error.message);
  }
  
};
