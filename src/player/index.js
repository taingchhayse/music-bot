const { Player } = require("discord-music-player")
const play = require("./functions/play")
const { sync } = require("glob")
const { resolve } = require("path")

async function player(client) {
    client.player = new Player(client, {
        leaveOnEmpty: false,
        deafenOnJoin: true,
    })

    let player = client.player
    client.play = play
    const evtFile = await sync(resolve("./src/player/events/*.js"))
    evtFile.forEach((filepath) => {
        const File = require(filepath)
        if (!(File.prototype instanceof Event)) return
        const event = new File()
        player.on(event.name, (...args) => event.exec(...args, client))
    })

    player.on("error", (error, queue) => {
        client.logger.error(
            `There was an error with the music player\n${
                error.message ? error + "\n\n" + error.message : error
            }`,
            { tag: "Player" }
        )
    })
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.guild) return
        let filterMsg = message.content.split(" ")
        let prefix = filterMsg[0]
        let song = message.content.substring(message.content.indexOf(" ") + 1)
        let data
        if (prefix === "-p" || prefix === "-=") {
            play(client, message, data, song)
        }
    })
}

module.exports = player
