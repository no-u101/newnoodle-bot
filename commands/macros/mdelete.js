const fs = require("fs")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "mdelete",
    description: "Create a macro.",
    args: true,
    async execute(message, args) {
        const name = args[0].toLowerCase()
        const macos = JSON.parse(fs.readFileSync("./databases/macros.json"))

        if (member.roles.cache.some(role => role.id == "849046624763117589")) {

            for (const x in macos.macros) {
                if (macos.macros[x].name.toLowerCase() == name) {
                    delete macos.macros[x]
                    fs.writeFileSync("./databases/macros.json", JSON.stringify(macos))
                    message.channel.send({ content: "Deleted the macro." })
                    return
                }
            }
            message.channel.send({ content: "There is no macro with that name." })
        }
    }
}