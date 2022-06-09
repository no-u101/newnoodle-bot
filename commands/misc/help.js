const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "command names",
    execute(message, args) {
        const embed = new MessageEmbed()
            .setTitle("Available commands.")
            .setDescription("**Normal commands:** \`latest\`, \`randid\`, \`github\`\n\n**Slash commands:** \`report\`")
            .setColor("RANDOM")

        message.channel.send({ embeds: [embed] })
    }
}