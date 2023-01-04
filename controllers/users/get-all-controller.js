//** get all workers */

const pool = require("../../config");
const { StatusCodes } = require('http-status-codes');

exports.getAllWorkers = async (req, res) => {

  try {
    const AllWorkers = await pool.query(
      " SELECT * FROM salarie"
    );
    res.status(StatusCodes.OK).json({ "salaries": AllWorkers.rows });
    // console.warn("get request", allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request" })
  }
};

//** get all society */

exports.getAllSocieties = async (req, res) => {

  try {
    const allSocieties = await pool.query(
      "SELECT * FROM entreprise "
    );
    res.status(StatusCodes.OK).json({ "societes": allSocieties.rows });
    // console.warn("get request", allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request" })
  }

};

//** get all users */

exports.getAllUsers = async (req, res) => {

  try {
    const allUsers = await pool.query(
      "SELECT * FROM utilisateur ORDER BY utilisateur_id ASC"
    );
    res.status(StatusCodes.OK).json({ "myUsers": allUsers.rows });
    // console.warn("get request", allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request" })
  }

};
