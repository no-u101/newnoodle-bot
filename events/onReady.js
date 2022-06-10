module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`)
		client.user.setActivity("to /report", { type: "LISTENING" })
	}
}
