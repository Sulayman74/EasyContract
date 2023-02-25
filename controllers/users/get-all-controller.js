//** get all workers */

const pool = require("../../config");
const { StatusCodes } = require('http-status-codes');

exports.getAllWorkers = async (req, res) => {

  // * Ce code récupère tous les employés d'une base de données et les envoie à la demande d'un utilisateur via l'utilisation d'une requête SQL. Il utilise également le package npm "status-codes" pour gérer les codes HTTP et imprimer des messages d'erreur si nécessaire./
  try {
    const AllWorkers = await pool.query(
      " SELECT * FROM salarie ORDER BY salarie.nom ASC "
    );
    res.status(StatusCodes.OK).json({ "salaries": AllWorkers.rows, "message": "Tous les salaries sont là" });
    // console.warn("get request", allUsers);
  } catch (error) {
    console.error(error.message);
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request" })
  }
};

//** get all society */

exports.getAllSocieties = async (req, res) => {

  // ** Ce code récupère toutes les entreprises depuis la base de données et les renvoie au client sous forme de réponse JSON. Il utilise la méthode pool.query() pour exécuter une requête SQL et récupérer les données à partir de la base de données. En cas d'erreur, il envoie une erreur au client avec un code d'état approprié.*/
  try {
    const allSocieties = await pool.query(
      "SELECT * FROM entreprise ORDER BY entreprise.raison_sociale ASC "
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

  /**
 * Cette fonction récupère tous les utilisateurs de la base de données et les renvoie sous forme d'un objet JSON, en utilisant la méthode pool.query().
 * En cas d'erreur, une erreur Bad Request est renvoyée.
 */

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
