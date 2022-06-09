const fs = require("fs")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "mlist",
    description: "Lists all macros.",
    async execute(message, args) {
        if (member.roles.cache.some(role => role.id == "849046624763117589")) {
            const macos = JSON.parse(fs.readFileSync("./databases/macros.json"))
            const macros = []

            macos.macros.forEach(maco => {
                macros.push(`\`${maco.name}\``)
            })

            const msg = macros.join("\n")

            message.channel.send(msg)
        }
    }
}