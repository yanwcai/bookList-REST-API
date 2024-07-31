const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: '941228',
  host: 'localhost',
  port: 5432, 
  database: 'booklist'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};