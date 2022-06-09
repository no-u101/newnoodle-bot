const fs = require("fs")

module.exports = {
    name: "warnlist",
    description: "Gets all the warnings for a user.",
    execute(message, args) {

        if (member.roles.cache.some(role => role.id == "849770468264509540" || role.id == "841911194445152316")) {

            const person = args[0]

            const db = JSON.parse(fs.readFileSync("./databases/warns.json"))

            const entryArray = []
            let i = 0

            db.warns.forEach(warn => {
                if (warn.person == person) {
                    i += 1
                    entryArray.push(`**Entry ${i}**:\nReason: \`${warn.reason}\`\nCaller: \`${warn.caller}\` <@${warn.caller}>\nDate: \`${warn.date}\``)
                }
            })

            const msg = entryArray.join("\n\n")

            if (msg.length > 1954) {
                const final = content.match(/.{1,1954}/g)
                for (const x in final) {
                    message.channel.send({ content: `Warnings from **${person} - <@${person}>**\n\n${final[x]}`, allowedMentions: { parse: [] } })
                }
            }

            else {
                message.channel.send({ content: `Warnings from **${person} - <@${person}>**\n\n${msg}`, allowedMentions: { parse: [] } })
            }
        }
    }
}