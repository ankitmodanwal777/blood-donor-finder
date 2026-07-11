const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: 'blood-db.canseumum0hx.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Admin2026',
  database: 'blooddb',
  waitForConnections: true,
  connectionLimit: 10,
});

app.get('/', (req, res) => res.render('index'));

app.post('/register', async (req, res) => {
  try {
    const { name, blood_group, city, phone } = req.body;
    await pool.query(
      'INSERT INTO donors (name, blood_group, city, phone) VALUES (?, ?, ?, ?)',
      [name, blood_group, city, phone]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err.message);
  }
});

app.get('/search', async (req, res) => {
  try {
    const { blood_group, city } = req.query;
    const [rows] = await pool.query(
      'SELECT * FROM donors WHERE blood_group = ? AND city = ?',
      [blood_group, city]
    );
    res.render('results', { donors: rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error: ' + err.message);
  }
});

app.listen(3000, () => console.log('Blood Finder running on port 3000'));
