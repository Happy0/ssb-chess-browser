const getClient = require('./SsbClient');

getClient().then(sbot => {
    console.dir(sbot);
}).catch(e => console.log("Exception " + e))