const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  host: 'db',
  user: 'postgres',
  password: 'postgres',
  database: 'votes'
});

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM votes');
  let html = "<h1>Results</h1><ul>";
  result.rows.forEach(r => {
    html += `<li>${r.vote} : ${r.count}</li>`;
  });
  html += "</ul>";
  res.send(html);
});

app.listen(4000, () => console.log('Results app running on port 4000'));
