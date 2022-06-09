const fs = require("fs")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "m",
    description: "Triggers a macro.",
    args: true,
    async execute(message, args) {
        const name = args[0].toLowerCase()
        const ping = args[1]
        const macos = JSON.parse(fs.readFileSync("./databases/macros.json"))
        if (ping == undefined) {
            macos.macros.forEach(maco => {
                if (maco.name.toLowerCase() == name) {
                    message.delete()
                    if (maco.footer == null) {
                        if (maco.image == null) {
                            const embed = new MessageEmbed()
                                .setTitle(maco.title)
                                .setDescription(maco.description)
                                .setColor("AQUA")

                            message.channel.send({ embeds: [embed] })
                            return
                        }

                        else {
                            const embed = new MessageEmbed()
                                .setTitle(maco.title)
                                .setDescription(maco.description)
                                .setImage(maco.image)
                                .setColor("AQUA")

                            message.channel.send({ embeds: [embed] })
                            return
                        }
                    }

                    else {
                        if (maco.image == null) {
                            const embed = new MessageEmbed()
                                .setTitle(maco.title)
                                .setDescription(maco.description)
                                .setFooter({ text: maco.footer })
                                .setColor("AQUA")

                            message.channel.send({ embeds: [embed] })
                            return
                        }

                        else {
                            const embed = new MessageEmbed()
                                .setTitle(maco.title)
                                .setDescription(maco.description)
                                .setImage(maco.image)
                                .setFooter({ text: maco.footer })
                                .setColor("AQUA")

                            message.channel.send({ embeds: [embed] })
                            return
                        }
                    }
                }
            })
        }

        else {
            macos.macros.forEach(maco => {
                if (maco.name.toLowerCase() == name) {
                    message.delete()
                    if (maco.footer == null) {
                        if (maco.image == null) {
                            const embed = new MessageEmbed()
                                .setTitle(maco.title)
                                .setDescription(maco.description)
                                .setColor("AQUA")

                            message.channel.send({ content: `${ping}`, embeds: [embed], allowedMentions: { parse: ["users"] } })
                            return
                        }

                        else {
                            const embed = new MessageEmbed()
                                .setTitle(maco.title)
                                .setDescription(maco.description)
                                .setImage(maco.image)
                                .setColor("AQUA")

                            message.channel.send({ content: `${ping}`, embeds: [embed], allowedMentions: { parse: ["users"] } })
                            return
                        }
                    }

                    else {
                        if (maco.image == null) {
                            const embed = new MessageEmbed()
                                .setTitle(maco.title)
                                .setDescription(maco.description)
                                .setFooter({ text: maco.footer })
                                .setColor("AQUA")

                            message.channel.send({ content: `${ping}`, embeds: [embed], allowedMentions: { parse: ["users"] } })
                            return
                        }

                        else {
                            const embed = new MessageEmbed()
                                .setTitle(maco.title)
                                .setDescription(maco.description)
                                .setImage(maco.image)
                                .setFooter({ text: maco.footer })
                                .setColor("AQUA")

                            message.channel.send({ content: `${ping}`, embeds: [embed], allowedMentions: { parse: ["users"] } })
                            return
                        }
                    }
                }
            })
        }
    }
}