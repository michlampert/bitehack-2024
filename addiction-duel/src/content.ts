console.log('Hello Content');
if (window.location.href.includes("news.ycombinator.com")) {
    console.log("On Hacker News!");
    createPopup();
}


function createPopup() {
    // Create a new div element for the popup
    var popup = document.createElement('div');

    // Set some styles for the popup
    popup.style.position = 'fixed';
    popup.style.top = '20%';
    popup.style.left = '20%';
    popup.style.width = '60%';
    popup.style.height = '60%';
    popup.style.backgroundColor = 'red';
    popup.style.color = 'white';
    popup.style.padding = '20px';
    popup.style.zIndex = '1000';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.fontSize = '20px';
    popup.innerText = 'This is a red popup window!';

    // Add a button to close the popup
    var closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.marginTop = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = function () {
        popup.remove();
    };
    popup.appendChild(closeButton);

    // Append the popup to the body of the webpage
    document.body.appendChild(popup);
}
export { }
