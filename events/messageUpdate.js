const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "messageUpdate",
    execute(oldMessage, newMessage) {
        if (newMessage.author.bot == true) return
        if (oldMessage.content == newMessage.content) return

        const channel = newMessage.guild.channels.cache.get("848645733553012766")
        
        const embed = new MessageEmbed()
            .setTitle("Message Edited")
            .setColor("ORANGE")
            .setAuthor({ name: `${newMessage.author.username}#${newMessage.author.discriminator} [${newMessage.author.id}]`, iconURL: `https://cdn.discordapp.com/avatars/${newMessage.author.id}/${newMessage.author.avatar}.webp?size=80`, url: `https://discordapp.com/users/${newMessage.author.id}` })
            .addFields(
                { name: "User", value: `<@${newMessage.author.id}>`, inline: true },
                { name: "Channel", value: `${newMessage.channel}`, inline: true },
                { name: "Message ID", value: `\`${newMessage.id}\``, inline: true },
                { name: "Old message", value: `\`\`\`${oldMessage.content}\`\`\``},
                { name: "New message", value: `\`\`\`${newMessage.content}\`\`\``}
            )

        channel.send({ embeds: [embed] })
    }
}