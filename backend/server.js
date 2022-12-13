require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./config');
const PORT = process.env.PORT_LISTEN
// ** middleware
app.use(cors());
app.use(express.json()); // ? req.body
app.connect(pool);


// ! Routes

const userRouter = require('./routes/users-router');
const contractRouter = require('./routes/contracts-router')
app.use('/api/users', userRouter);
app.use('/api/contracts', contractRouter);

// ! écoute du port

app.listen(PORT || null, ()=> {
    console.log('le serveur est lancé')
})



