const ssbSingleton = require('ssb-browser-core/ssb-singleton')
const caps = require("ssb-caps")

function getCaps() {
    return caps.shs
}

function extraModules(secretStack) {
  return secretStack.use({
    init: function (sbot, config) {
      sbot.db.registerIndex(require('ssb-db2/indexes/full-mentions'))
    }
  })
  .use({
    init: function (sbot, config) {
      sbot.db.registerIndex(require('ssb-db2/indexes/about-self'))
    }
  })
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
        tunnel: [{ scope: 'public', transform: 'shs' }],
        dht: [{ scope: 'public', transform: 'shs' }]
      },
      outgoing: {
        net: [{ transform: 'shs' }],
        ws: [{ transform: 'shs' }, { transform: 'noauth' }],
        tunnel: [{ transform: 'shs' }],
        dht: [{ transform: 'shs' }]
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
  const p = new Promise((resolve, reject) => {
    ssbSingleton.init(config, extraModules, () => {
      console.log("giving back the hingmy that I promised")
      resolve(window.singletonSSB)
    })
  })

  ssbSingleton.getSSBEventually(
    -1,
    () => { return true },
    (SSB) => { return SSB },
    (err, SSB) => {
      console.log("got SSB")
      console.log(SSB)
    }
  )

  return p.then(sbot => {
    return new Promise((resolve, reject) => {
      sbot.net.dhtInvite.start((err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(sbot);
        }
      });
    })
  })
}
