// Function to fetch and display GitHub stats
function fetchAndDisplayStats(username) {
    // Construct the URL to fetch the GitHub stats image
    const url = `https://github-readme-stats-garvit-exe.vercel.app/api?username=${username}&theme=transparent&hide_border=true&include_all_commits=true&count_private=false`;

    // Fetch the GitHub stats image
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            // Create a URL for the blob
            const imageUrl = URL.createObjectURL(blob);

            // Create an image element to get its dimensions
            const img = new Image();
            img.onload = function() {
                // Set the width and height of the popup based on the image dimensions
                const popupWidth = img.width + 20; // Add some padding
                const popupHeight = img.height + 20; // Add some padding
                document.getElementById('content').style.width = popupWidth + 'px';
                document.getElementById('content').style.height = popupHeight + 'px';

                // Set the source of the image element and show it
                const imgElement = document.getElementById('githubStatsImage');
                imgElement.src = imageUrl;
                imgElement.style.display = 'block';

                // Hide the input container and error container
                document.getElementById('inputContainer').style.display = 'none';
                document.getElementById('errorContainer').style.display = 'none';
            };
            img.src = imageUrl;
        })
        .catch(error => {
            console.error('Error fetching GitHub stats:', error);
            // Display error message or handle accordingly
            const errorContainer = document.getElementById('errorContainer');
            errorContainer.innerText = 'Error fetching GitHub stats. Please try again later.';
            errorContainer.style.display = 'block';
        });
}

// Function to handle submission of username
function handleUsernameSubmission() {
    const username = document.getElementById('username').value.trim();

    if (username !== '') {
        // Save the username to Chrome storage
        chrome.storage.sync.set({ 'githubUsername': username }, function() {
            // Fetch and display GitHub stats
            fetchAndDisplayStats(username);
            // Hide the input container
            document.getElementById('inputContainer').style.display = 'none';
        });
    }
}

// Function to initialize the popup
function initializePopup() {
    // Retrieve the saved username from Chrome storage
    chrome.storage.sync.get(['githubUsername'], function(result) {
        const username = result.githubUsername;

        if (username) {
            // If a username is saved, fetch and display GitHub stats
            fetchAndDisplayStats(username);
        } else {
            // If no username is saved, show the input container
            document.getElementById('inputContainer').style.display = 'block';
        }
    });
}

// Initialize the popup
initializePopup();

// Event listener for submit button
document.getElementById('submitBtn').addEventListener('click', handleUsernameSubmission);
