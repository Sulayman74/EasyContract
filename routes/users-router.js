const express = require('express');
const userRouter = express.Router();

//! ajout de users/register/login */

//** salariés */
const addWorker = require("../controllers/users/add-controller");
const registerWorker = require("../controllers/users/register-controllers");
const loginWorker = require("../controllers/users/login-controllers")

//** entreprises */
const addSociety = require("../controllers/users/add-controller");
const registerSociety = require("../controllers/users/register-controllers");
const loginSociety = require("../controllers/users/login-controllers")

//** recherche de tous les users ou d'un seul en particulier par son id */
const getAllUsers= require("../controllers/users/get-all-controller");
const getaWorker = require("../controllers/users/get-one-controller");
const getaSociety = require("../controllers/users/get-one-controller");
const getWorkers = require("../controllers/users/get-all-controller");
const getSocieties = require("../controllers/users/get-all-controller");

//** suppression d'un salarié ou entreprise ( suppression compte) */

const deleteWorker = require("../controllers/users/delete-controller");
const deleteSociety = require("../controllers/users/delete-controller");

//** mise à jour des données */
const updateWorker = require("../controllers/users/update-controller")
const updateSociety = require("../controllers/users/update-controller");
const authenticateToken = require('../middleware/auth');

// ! ------------------------------------------------ */

// TODO ------ les routes sans verification de Token ----- */

//** worker register login */
userRouter.post("/loginWorker", loginWorker.loginSalarie)
userRouter.post("/registerWorker", registerWorker.registerWorker);

//** society register login */
userRouter.post("/loginSociety", loginSociety.loginSociety)
userRouter.post("/registerSociety", registerSociety.registerSociety)

// TODO --------- routes qui ont besoin du token pour y accéder ------- */


//** All the users route */
userRouter.get("/allUsers",authenticateToken, getAllUsers.getAllUsers);

//** Users by Id  */
userRouter.get("/oneWorker/:id",authenticateToken,  getaWorker.getWorker);
userRouter.get("/oneSociety/:id",authenticateToken,  getaSociety.getSociety);

//** All the workers */
userRouter.get("/workers",authenticateToken, getWorkers.getAllWorkers);

//** All the societies */
userRouter.get("/societies",authenticateToken, getSocieties.getAllSocieties);

//** worker add */
userRouter.post("/createWorker",authenticateToken, addWorker.addWorker);
//** society add register login */
userRouter.post("/registerSociety",authenticateToken, registerSociety.registerSociety)
userRouter.post("/createSociety",authenticateToken, addSociety.addSociety);

//** delete section */
userRouter.delete("/deleteWorker/:id",authenticateToken, deleteWorker.deleteWorker);
userRouter.delete("/deleteSociety/:id",authenticateToken, deleteSociety.deleteSociety)

//** update section */
userRouter.put("/updateWorker/:id",authenticateToken, updateWorker.updateWorker)
userRouter.put("/updateSociety/:id",authenticateToken, updateSociety.updateSociety)


module.exports = userRouter; 