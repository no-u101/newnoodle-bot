const fs = require("fs")

module.exports = {
    name: "warn",
    description: "Warns a member.",
    async execute(message, args) {

        const member = message.guild.members.cache.get(message.author.id)

        if (member.roles.cache.some(role => role.id == "849770468264509540" || role.id == "841911194445152316")) {

            try {
                const person = args[0]
                const member = message.guild.members.cache.get(person)

                message.channel.send({ content: "Write out your warning" })
                setTimeout(() => message.channel.awaitMessages({ max: 1, time: 60000, errors: ["time"] }).then((collected) => {

                    const db = JSON.parse(fs.readFileSync("./databases/warns.json"))

                    const entries = db.warns

                    const date = new Date()
                    const month = date.getUTCMonth() + 1
                    const day = date.getUTCDay()
                    const year = date.getUTCFullYear()

                    entries.push(
                        {
                            "person": person,
                            "caller": message.author.id,
                            "reason": collected.first().content,
                            "date": `${day}/${month}/${year}`
                        }
                    )
                    message.channel.send({ content: "Successfully warned the member!" })

                    try {
                        member.send(`You've been warned with the warning: \`${collected.first().content}\``)
                    } catch (err) {
                        message.channel.send({ content: "Couldn't dm the user with the warning." })
                    }

                    fs.writeFileSync("./databases/warns.json", JSON.stringify(db))
                }).catch(collected => {
                    message.channel.send("The collector time has ran out, but don't worry, when you write out the warning just do the command again!")
                }), 1000)
            } catch (err) {
                console.log(err)
                message.channel.send("Something went wrong.")
            }
        }
    }
}