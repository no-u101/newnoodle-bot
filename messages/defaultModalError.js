module.exports = {
	async execute(interaction) {
		await interaction.reply({
			content: "Something went wrong.",
			ephemeral: true
		})
		return
	}
}
