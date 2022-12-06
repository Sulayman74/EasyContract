const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080
const pool = require('./config');

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

app.listen(port || null, ()=> {
    console.log('le serveur est lancé sur le port' + ' ' + port);
})



