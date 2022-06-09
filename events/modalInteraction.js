module.exports = {
	name: "interactionCreate",
	async execute(interaction) {
		const { client } = interaction

		if (!interaction.isModalSubmit()) return

		const command = client.modalCommands.get(interaction.customId)

		if (!command) {
			await require("../messages/defaultModalError").execute(interaction)
			return
		}

		try {
			await command.execute(interaction)
			return
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "Something went wrong.",
				ephemeral: true
			})
			return
		}
	}
}
