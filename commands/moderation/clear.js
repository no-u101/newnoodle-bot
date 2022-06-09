module.exports = {
    name: "clear",
    description: "Deletes X nubmer of messages (max 100).",
    async execute(message, args) {
        const person = message.guild.members.cache.get(message.author.id)
        if (member.roles.cache.some(role => role.id == "849770468264509540" || role.id == "841911194445152316")) {

            let amount = Number(args[0])
            if (amount == NaN) return message.reply("Your argument needs to be a number.")
            if (amount <= 0) return message.reply("The number must be more than 0.")
            if (amount > 100) amount = 100

            message.delete()

            message.channel.bulkDelete(amount, true).then((messages) => {
                const messageArray = []
                messages.forEach(msg => {
                    messageArray.push(`${msg.author.username} (${msg.author.id}) : ${msg.content}`)
                })

                const log = messageArray.reverse().join("\n")
                const channel = message.guild.channels.cache.get("935171555925819452")

                if (log.length > 1994) {
                    const logs = log.match(/.{1,1994}/g)
                    for (const x in logs) {
                        channel.send(`\`\`\`${logs[x]}\`\`\``)
                    }
                }

                else {
                    channel.send(`\`\`\`${log}\`\`\``)
                }

                message.channel.send(`Deleted \`${messages.size}\` messages.`).then((message) => {
                    setTimeout(() => message.delete(), 1000)
                })
            })
        }
    }
}