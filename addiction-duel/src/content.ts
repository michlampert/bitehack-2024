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
    popup.style.top = '10%';
    popup.style.left = '10%';
    popup.style.width = '80%';
    popup.style.height = '80%';
    popup.style.backgroundColor = '#f44336'; // A nicer shade of red
    popup.style.color = 'white';
    popup.style.padding = '20px';
    popup.style.zIndex = '1000';
    popup.style.borderRadius = '15px';
    popup.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.5)';
    popup.style.display = 'flex';
    popup.style.flexDirection = 'column';
    popup.style.justifyContent = 'space-around';
    popup.style.alignItems = 'center';
    popup.style.fontSize = '20px';

    // Create and style the title
    var title = document.createElement('h1');
    title.innerText = 'Warning!';
    title.style.margin = '0';
    title.style.fontSize = '30px';
    popup.appendChild(title);

    // Create and style the description
    var description = document.createElement('p');
    description.innerText = 'Remember about the challenges.';
    description.style.fontSize = '20px';
    popup.appendChild(description);

    // Create a container for buttons
    var buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'center';

    // Add a "Don't Be a Loser" button
    var positiveButton = document.createElement('button');
    positiveButton.innerText = "Don't Be a Loser";
    setButtonStyle(positiveButton);
    positiveButton.onclick = function () {
        window.history.back();
    };
    buttonContainer.appendChild(positiveButton);

    // Add an "Ignore" button
    var ignoreButton = document.createElement('button');
    ignoreButton.innerText = 'Ignore';
    setButtonStyle(ignoreButton);
    ignoreButton.onclick = function () {
        popup.remove();
    };
    buttonContainer.appendChild(ignoreButton);

    // Append the button container to the popup
    popup.appendChild(buttonContainer);

    // Append the popup to the body of the webpage
    document.body.appendChild(popup);
}

function setButtonStyle(button: HTMLButtonElement) {
    button.style.margin = '10px';
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.backgroundColor = 'white';
    button.style.color = '#f44336';
    button.style.fontWeight = 'bold';
}

export { }
