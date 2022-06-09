const { MessageEmbed } = require("discord.js")

module.exports = {
    id: "report",
    async execute(interaction) {
       const member = interaction.fields.getTextInputValue("member") 
       const report = interaction.fields.getTextInputValue("content")
       const channel = interaction.guild.channels.cache.get("891083452995223582")

        const embed = new MessageEmbed()
            .setTitle("New report!")
            .setAuthor({ name: interaction.user.username + "#" + interaction.user.discriminator })
            .setDescription(`**Reported member:** \`${member}\`\n\n**Report content:** \`${report}\``)
            .setColor("RED")

        channel.send({ embeds: [embed] })
        interaction.reply({ content: "Your report has been received, when a staff sees it they will contact you through dms.", ephemeral: true})
    }
}