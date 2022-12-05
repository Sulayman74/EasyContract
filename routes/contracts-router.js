const express = require('express');
const contractRouter = express.Router();

const addContract = require("../controllers/contracts/add-controller");
const deleteContract = require("../controllers/contracts/delete-controller");
const getContracts = require("../controllers/contracts/get-all")
const getOne = require("../controllers/contracts/get-one")

contractRouter.get("/allContracts", getContracts.getAll);
contractRouter.get("/oneContract", getOne.getOne);

contractRouter.post("/create", addContract.addContract);

contractRouter.delete("/delete/:id", deleteContract.deleteContract);

module.exports = contractRouter; 