const getClient = require('./SsbClient');

getClient().then(sbot => {
    console.log("huh")

    const dhtInvite = sbot.net.dhtInvite
    dhtInvite.start((err, result) => {
            console.log("hm")

            setTimeout(() => {
                dhtInvite.create((err, invite) => {
                    console.log(":o")
                    console.log(invite);
                    console.log("o:")
                })
            }, 5000)

            
    })

}).catch(e => console.log("Exception " + e))