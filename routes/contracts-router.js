const express = require('express');
const contractRouter = express.Router();
const authenticateToken = require('../middleware/auth');


const addContract = require("../controllers/contracts/add-controller");
const deleteContract = require("../controllers/contracts/delete-controller");

const getContracts = require("../controllers/contracts/get-all")
const getOne = require("../controllers/contracts/get-one")
const getContratsSalarie = require("../controllers/contracts/get-contrats")

contractRouter
    .use(authenticateToken)
    .get("/contrat", getContratsSalarie.getContrats)
    .post("/createContract", addContract.addContract)
    .get("/allContracts", getContracts.getAll)
    .get("/oneContract/:id", getOne.getOne)
    .delete("/delete/:id", deleteContract.deleteContract)

module.exports = contractRouter; 