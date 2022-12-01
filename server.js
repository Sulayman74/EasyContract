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

const mainRouter = require('./routes/main-router');
app.use('/api/users', mainRouter);

app.listen(port || null, ()=> {
    console.log('le serveur est lancé sur le port' + ' ' + port);
})



