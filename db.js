const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'books-database',
  port: 5432,
  database: 'books'
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};