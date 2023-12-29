const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'coffee_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.post('/log-coffee', (req, res) => {
    const { personName } = req.body;

    db.query(
        'INSERT INTO coffee_logs (person_name, coffee_count) VALUES (?, 1) ON DUPLICATE KEY UPDATE coffee_count = coffee_count + 1',
        [personName],
        (err, result) => {
            if (err) {
                console.error('Error logging coffee:', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});

app.get('/get-coffee-logs', (req, res) => {
    db.query('SELECT * FROM coffee_logs', (err, result) => {
        if (err) {
            console.error('Error fetching coffee logs:', err);
            res.sendStatus(500);
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});