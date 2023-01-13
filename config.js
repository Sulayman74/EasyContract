// const Pool = require("pg").Pool;
const { Pool } = require("pg");
require("dotenv").config();



// const pool = new Pool({
//   user: process.env.BDD_USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   port: 5432,
//   database: process.env.DATABASE,
//   ssl : true
// });

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT_CONFIG,
  database: process.env.DATABASE,

});

module.exports = pool;
