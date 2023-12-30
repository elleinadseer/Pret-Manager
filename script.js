const jagNumElement = document.getElementById('jagNum');
const redeemButton = document.getElementById('redeem');

document.addEventListener('DOMContentLoaded', function() {
    const jagTile = document.getElementById("openJag") 
const jagModal = document.getElementById("jagDialog")
const closeButton = document.getElementById("close");

jagTile.addEventListener("click", () => {
   jagModal.showModal() 
  });

  closeButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Stop the event from propagating
    jagModal.close();
});
});

  // Function to update coffee count and start the countdown
  async function redeemCoffee() {
    // Assuming the maximum coffee count is 5
    const maxCoffeeCount = 5;

    // Get current coffee count
    let currentCoffeeCount = parseInt(jagNumElement.innerText, 0);

    // Check if the maximum count is reached
    if (currentCoffeeCount < maxCoffeeCount) {
        // Make a fetch request to the server to redeem coffee
        try {
            const response = await fetch('/redeem-coffee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ personName: 'Jag' }), // Send the person's name to identify who redeemed the coffee
            });

            if (response.ok) {
                // Increment coffee count on the client side
                jagNumElement.innerText = currentCoffeeCount + 1;

                // Disable the redeem button temporarily
                redeemButton.disabled = true;

                // Enable the redeem button after 30 minutes
                setTimeout(() => {
                    redeemButton.disabled = false;
                }, 30 * 60 * 1000); // 30 minutes in milliseconds
            } else {
                console.error('Error redeeming coffee:', response.statusText);
            }
        } catch (error) {
            console.error('Error redeeming coffee:', error);
        }
    }
}

// Event listener for redeem button click
redeemButton.addEventListener('click', redeemCoffee);

