module.exports = async function playM(
  client,
  int,
  data,
  input,
  source = "youtube",
  playlist = false,
  search = false,
  last = false,
  force = false
) {
  let guildQueue = client.player.hasQueue(int.guild.id);
  let queue;
  if (!guildQueue) {
    queue = client.player.createQueue(int.guild.id);
    queue.skipVotes = [];
  } else {
    queue = client.player.getQueue(int.guild.id);
  }

  let channel = int.member.voice.channel;

  await queue.join(channel).catch((err) => {
    if (search) {
      return int.editReply({
        content: `${client.emotes.get(
          "nomic"
        )} I couldn't join the voice channel.`,
        embeds: [],
      });
    } else {
      return int.reply({
        content: `${client.emotes.get(
          "nomic"
        )} I couldn't join the voice channel!`,
        ephemeral: true,
      });
    }
  });

  if (!search && !last) {
    int.reply(
      `${client.emotes.get(
        "paimon1"
      )} Searching \`${input}\` ${client.emotes.get(`${source}`)}`
    );
  }

  queue.textChannel = int.channel;

  if (playlist) {
    let pl = await queue
      .playlist(input, { requestedBy: int.member.user })
      .catch((_, err) => {
        if (err) {
          console.log(err);
        }
        if (!queue) {
          queue.stop();
        }
      });

    if (!pl) return int.channel.send("No playlist found!");
  } else {
    if (force) {
      let song = await queue
        .play(input, { index: 0, requestedBy: int.member.user })
        .catch((_, err) => {
          if (err) {
            console.log(err);
          }
          if (!queue) {
            queue.stop();
          }
        });
      if (!song) return int.channel.send("No track found!");
      queue.skip();
    } else {
      let song = await queue
        .play(input, { requestedBy: int.member.user })
        .catch((_, err) => {
          if (err) {
            console.log(err);
          }
          if (!queue) {
            queue.stop();
          }
        });
      if (!song) return int.channel.send("No track found!");
    }
  }
};
