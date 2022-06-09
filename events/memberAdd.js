const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const channel = member.guild.channels.cache.get("848645733553012766")
        
        const embed = new MessageEmbed()
            .setTitle("New Join")
            .setColor("GREEN")
            .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.webp?size=80`)
            .setDescription(`**${member.user.username} Joined the server!**\n\n**Account creation date:** \`${member.user.createdAt}\``)

        channel.send({ embeds: [embed] })
    }
}