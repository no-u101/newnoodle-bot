const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageActionRow, Modal, TextInputComponent } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("Report a server member."),
    async execute(interaction) {
        const modal = new Modal()
            .setCustomId("report")
            .setTitle("Report a member!")

        const member = new TextInputComponent()
            .setCustomId("member")
            .setLabel("The reported member (eg. StormPacer#2871)")
            .setStyle("SHORT")

        const report = new TextInputComponent()
            .setCustomId("content")
            .setLabel("What do you want to report the member for?")
            .setStyle("PARAGRAPH")

        const firstRow = new MessageActionRow().addComponents(member)
        const secondRow = new MessageActionRow().addComponents(report)

        modal.addComponents(firstRow, secondRow)

        await interaction.showModal(modal)
    }
}