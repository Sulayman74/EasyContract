const express = require('express');
const userRouter = express.Router();

//** ajout de users */
const addWorker = require("../controllers/users/add-controller");
const addSociety = require("../controllers/users/add-controller");
//** recherche de tous les users ou d'un seul en particulier par son id */
const getAllUsers= require("../controllers/users/get-all-controller");
const getWorker = require("../controllers/users/get-one-controller");
const getSociety = require("../controllers/users/get-one-controller");

//** suppression d'un salarié ou entreprise ( suppression compte) */

const deleteWorker = require("../controllers/users/delete-controller");
const deleteSociety = require("../controllers/users/delete-controller");

//** mise à jour des données */
const updateWorker = require("../controllers/users/update-controller")
const updateSociety = require("../controllers/users/update-controller")

userRouter.get("/allUsers", getAllUsers.getAllUsers);
userRouter.get("/oneWorker/:id",  getWorker.getWorker)
userRouter.get("/oneSociety/:id",  getSociety.getSociety)

userRouter.post("/createWorker", addWorker.addWorker);
userRouter.post("/createSociety", addSociety.addSociety);

userRouter.delete("/deleteWorker/:id", deleteWorker.deleteWorker);
userRouter.delete("/deleteSociety/:id", deleteSociety.deleteSociety)

userRouter.put("/updateWorker/:id", updateWorker.updateWorker)
userRouter.put("/updateSociety/:id", updateSociety.updateSociety)

module.exports = userRouter; 