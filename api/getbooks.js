const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.POSTGRES_CONN,
  ssl: { rejectUnauthorized: false }
});

module.exports = async function (context, req) {

  try {
    const result = await pool.query("SELECT * FROM books ORDER BY id DESC");

    context.res = {
      status: 200,
      body: result.rows
    };

  } catch (err) {
    context.res = {
      status: 500,
      body: err.message
    };
  }
};