const getClient = require('./SsbClient');
const clientPromise = getClient();
const { SbotBrowserCore } = require('ssb-chess-data-access');


const attachToId = "ssb-chess-browser";

window.addEventListener('load', (event) => {
    const attachToElement = document.getElementById(attachToId);

    if (!attachToElement) {
        console.error(`No element with ID ${attachToId} to attach to`);
        return;
    } else {
        clientPromise.then(client => {
            const ssbDataAccess = SbotBrowserCore(client);
            renderUI(attachToElement, ssbDataAccess);
        });
    }
});

