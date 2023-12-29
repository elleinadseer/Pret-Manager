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