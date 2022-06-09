module.exports = {
    name: "say",
    description: "Repeat after me!",
    execute(message, args) {
        if (member.roles.cache.some(role => role.id == "849770468264509540" || role.id == "841911194445152316")) {
            const content = message.content
            message.delete()
            message.channel.send({ content: `${content}` })
        }
    }
}