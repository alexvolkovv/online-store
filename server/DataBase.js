const pg = require('pg')
const { Pool } = pg

const pool = new Pool({
  user: 'postgres',
  port: 5432,
  database: 'online_store',
  password: 'alexwolf',
})

module.exports = pool
