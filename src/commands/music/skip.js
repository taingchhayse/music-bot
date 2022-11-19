module.exports = class Skip extends Interaction {
    constructor() {
        super({
            name: "skip",
            description: "Skips the current track",
        })
    }

    async exec(int, data) {
        let channel = int.member.voice.channel

        if (!channel)
            return int.reply({
                content: `${this.client.emotes.get(
                    "nomic"
                )} You must be in a voice channel to use this command!`,
                ephemeral: true,
            })
        if (
            int.guild.me.voice.channel &&
            channel !== int.guild.me.voice.channel
        )
            return int.reply({
                content: `${this.client.emotes.get(
                    "nomic"
                )} You must be in the same voice channel as me to use this command!`,
                ephemeral: true,
            })

        let isAllowed = data.voiceChannels.find((c) => c === channel.id)

        if (data.voiceChannels.length > 0 && !isAllowed) {
            return int.reply({
                content: `${this.client.emotes.get(
                    "nomic"
                )} You must be in one of the allowed voice channels to use this command!`,
                ephemeral: true,
            })
        }

        let queue = this.client.player.getQueue(int.guild.id)
        if (!queue || !queue.nowPlaying)
            return int.reply({
                content: "There is no music playing in this guild!",
                ephemeral: true,
            })

        queue.skipVotes = []
        let skipped = queue.skip()

        int.reply({
            content: `${this.client.emotes.get("skip")} Skipped **${
                skipped.name
            }**!`,
            ephemeral: true,
        })
    }
}
