        function fetchCoffeeLogs() {
            fetch('/get-coffee-logs')
                .then(response => response.json())
                .then(data => {
                    const coffeeLogs = document.getElementById('coffeeLogs');
                    coffeeLogs.innerHTML = '<h2>Coffee Logs</h2>';

                    data.forEach(log => {
                        coffeeLogs.innerHTML += `<p>${log.person_name}: ${log.coffee_count}</p>`;
                    });
                });
        }

        // Log coffee consumption for a person
        function logCoffee(personName) {
            fetch('/log-coffee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ personName }),
            })
                .then(() => fetchCoffeeLogs());
        }

        // Fetch coffee logs on page load
        fetchCoffeeLogs();



app.post('/log-coffee', (req, res) => {
    const { personName } = req.body;

    db.query(
        'UPDATE coffee_logs SET coffee_count = coffee_count + 1 WHERE person_name = ? AND coffee_count < 5',
       // 'INSERT INTO coffee_logs (person_name, coffee_count) VALUES (?, 1) ON DUPLICATE KEY UPDATE coffee_count = coffee_count + 1',
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