const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "messageDelete",
    execute(message) {
        if (message.author.bot == true) return

        const channel = message.guild.channels.cache.get("848645733553012766")

        const embed = new MessageEmbed()
            .setTitle("Message Deleted")
            .setColor("RED")
            .setAuthor({ name: `${message.author.username}#${message.author.discriminator} [${message.author.id}]`, iconURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp?size=80`, url: `https://discordapp.com/users/${message.author.id}` })
            .addFields(
                { name: "User", value: `<@${message.author.id}>`, inline: true },
                { name: "Channel", value: `${message.channel}`, inline: true },
                { name: "Message ID", value: `\`${message.id}\``, inline: true },
                { name: "Content", value: `\`\`\`${message.content}\`\`\`` }
            )

        channel.send({ embeds: [embed] })
    }
}