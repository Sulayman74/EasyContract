const express = require('express');
const contractRouter = express.Router();
const authenticateToken = require('../middleware/auth');


const addContract = require("../controllers/contracts/add-controller");
const deleteContract = require("../controllers/contracts/delete-controller");

const getContracts = require("../controllers/contracts/get-all")
const getOne = require("../controllers/contracts/get-one")

contractRouter
.use(authenticateToken)
.post("/createContract", addContract.addContract)
.get("/allContracts", getContracts.getAll)
.get("/oneContract/:id", getOne.getOne)
.delete("/delete/:id", deleteContract.deleteContract)

module.exports = contractRouter; 