const express = require('express');
const contractRouter = express.Router();

const addContract = require("../controllers/contracts/add-controller");
const deleteContract = require("../controllers/contracts/delete-controller");

const getContracts = require("../controllers/contracts/get-all")
const getOne = require("../controllers/contracts/get-one")


contractRouter.get("/allContracts", getContracts.getAll);
contractRouter.get("/oneContract/:id", getOne.getOne);


contractRouter.post("/createContract", addContract.addContract);

contractRouter.delete("/delete/:id", deleteContract.deleteContract);

module.exports = contractRouter; 