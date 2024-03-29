console.log('Hello Content');
const name = "Kuba";
let userId: number;


function main() {
    chrome.storage.local.get("user_id", function (result) {
        if (result.user_id) {
            userId = result.user_id;
            showPopupIfForbidden();
        } else {
            const url = `http://localhost:8000/create-user`;

            const data = {
                name: name,
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Response from server:', data);
                    userId = data.user_id;
                    chrome.storage.local.set({ "user_id": data.user_id });
                    showPopupIfForbidden();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    });
}

function getUserEventStatusesShowPopup() {
    const domain = window.location.hostname.replace(/^www\./, '');
    const url = `http://localhost:8000/get-user-event-statuses?user_id=${userId}&website=${domain}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
            createPopup(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function showPopupIfForbidden() {
    const domain = window.location.hostname.replace(/^www\./, '');
    const url = `http://localhost:8000/is-forbidden?user_id=${userId}&website=${domain}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
            if (data.is_forbidden) {
                getUserEventStatusesShowPopup();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function updateStatus(close: boolean) {
    const domain = window.location.hostname.replace(/^www\./, '');
    const url = `http://localhost:8000/update-status`;
    const data: { user_id: number; website: string;[key: string]: any } = {
        user_id: userId,
        website: domain
    };

    if (!close) {
        data.url = window.location.href;
    }


    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response from server:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

interface UserEventStatus {
    name: string;
    time_left: number;
}

function createPopup(data: UserEventStatus[]) {
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

    const toggleBlurEffect = (on: boolean): void => {
        const mainContent: HTMLCollection = document.body.children;
        Array.from(mainContent).forEach((element: Element) => {
            if (element !== popup) {
                const htmlElement: HTMLElement = element as HTMLElement;
                htmlElement.style.filter = on ? 'blur(8px)' : 'none';
            }
        });
    };

    toggleBlurEffect(true);

    // Create and style the title
    var title = document.createElement('h1');
    title.innerText = 'Warning!';
    title.style.margin = '0';
    title.style.fontSize = '30px';
    popup.appendChild(title);


    // Create and style the description
    const event_description = data.map(event => {
        return `${event.name} - time left: ${event.time_left} min`;
    }).join('\n')
    var description = document.createElement('p');
    description.innerText = 'Remember about the challenges.\n\n' + event_description;
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
        updateStatus(false);
        popup.remove();
        window.addEventListener("beforeunload", function () {
            updateStatus(true);
        });
        toggleBlurEffect(false);
        // Save visited pages on the same website:
        let lastUrl = window.location.href;
        setInterval(() => {
            const currentUrl = window.location.href;
            if (currentUrl !== lastUrl) {
                lastUrl = currentUrl;
                updateStatus(false);
            }
        }, 1000);
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

main();

export { }
