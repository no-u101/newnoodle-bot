const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildMemberRemove",
    execute(member) {
        const channel = member.guild.channels.cache.get("848645733553012766")
        
        const embed = new MessageEmbed()
            .setTitle("New Leave")
            .setColor("RED")
            .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp?size=80`)
            .setDescription(`**${member.user.username} Left the server**\n\n**Account creation date:** \`${member.user.createdAt}\`\n\n**Sever join date:** \`${member.joinedAt}\``)

        channel.send({ embeds: [embed] })
    }
}