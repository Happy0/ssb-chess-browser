const ssbSingleton = require('ssb-browser-core/ssb-singleton')
const caps = require("ssb-caps")

function getCaps() {
    return caps.shs
}

function extraModules(secretStack) {
    return secretStack;
}

module.exports = function getClient() {
    const config = {
        caps: { shs: Buffer.from(getCaps(), 'base64') },
        friends: {
          hops: 1,
          hookReplicate: false
        },
        connections: {
            incoming: {
              tunnel: [{ scope: 'public', transform: 'shs' }]
            },
            outgoing: {
              net: [{ transform: 'shs' }],
              ws: [{ transform: 'shs' }, { transform: 'noauth' }],
              tunnel: [{ transform: 'shs' }]
            }
          },
        hops: 1,
        conn: {
          autostart: false,
          hops: 1,
          populatePubs: false
        }
      };

    console.log("Promising hings")
    return new Promise((resolve, reject) => {
        ssbSingleton.init(config, extraModules, () => {
            console.log("giving back the hingmy that I promised")
            resolve(window.singletonSSB)

            // ssbSingleton.getSSBEventually(-1, () => true, /** ??? **/ () => true /*???*/,  (err, sbot) => {
            //     if (err) {
            //         reject(err);
            //     } else {
            //         resolve(sbot);
            //     }
            // })
        })
    })
    

}