const express = require('express');
const router = express.Router();

const addWorker = require("../controllers/add-controller");

router.post("/create", addWorker.addWorker);

module.exports = router; 