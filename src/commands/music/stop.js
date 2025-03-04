module.exports = class Stop extends Interaction {
    constructor() {
        super({
            name: "stop",
            description: "Stops the music player",
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

        let isDJ = data.djRoles.some((r) => int.member._roles.includes(r))
        let isAllowed = data.voiceChannels.find((c) => c === channel.id)
        let members = channel.members.filter((m) => !m.user.bot)

        if (data.voiceChannels.length > 0 && !isAllowed) {
            return int.reply({
                content: `${this.client.emotes.get(
                    "nomic"
                )} You must be in one of the allowed voice channels to use this command!`,
                ephemeral: true,
            })
        }

        if (
            members.size > 1 &&
            !isDJ &&
            !int.member.permissions.has("MANAGE_GUILD")
        ) {
            return int.reply({
                content:
                    "You must be a DJ or be alone in the voice channel to use this command!",
                ephemeral: true,
            })
        }

        let queue = this.client.player.getQueue(int.guild.id)
        if (!queue)
            return int.reply({
                content: "There is no music playing in this guild!",
                ephemeral: true,
            })

        queue.stop()

        return int.reply({
            content: `${this.client.emotes.get(
                "paimonpad"
            )} Stopped the music player!`,
            ephemeral: true,
        })
    }
}
