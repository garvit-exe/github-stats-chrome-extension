// Function to reload the extension
function reloadExtension() {
    chrome.runtime.reload();
}

// Function to handle installation or upgrade of the extension
function handleInstallOrUpgrade(details) {
    if (details.reason === 'install' || details.reason === 'update') {
        // Perform any necessary actions on installation or upgrade
    }
}

// Add listener for installation or upgrade of the extension
chrome.runtime.onInstalled.addListener(handleInstallOrUpgrade);

// Add listener for messages from the popup
chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === 'reloadExtension') {
        reloadExtension();
    }
});
