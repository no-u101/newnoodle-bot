const fs = require("fs")
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "mcreate",
    description: "Create a macro.",
    args: true,
    async execute(message, args) {
        const member = message.guild.members.cache.get(message.author.id)

        if (member.roles.cache.some(role => role.id == "849046624763117589")) {
            const name = args[0]
            const macos = JSON.parse(fs.readFileSync("./databases/macros.json"))

            for (const x in macos.macros) {
                try {
                    if (macos.macros[x].name.toLowerCase() == name.toLowerCase()) return message.channel.send({ content: "That macro already exists." })
                } catch (err) {
                }
            }

            message.channel.send({ content: "What should the embed title be? *type \`cancel\` to stop making the macro*" })

            setTimeout(() => message.channel.awaitMessages({ max: 1, time: 60000, errors: ["time"] }).then((collected) => {

                if (collected.first().content == "cancel") return message.channel.send({ content: "Cancelled the macro making process. " })

                const title = collected.first().content

                const embed = new MessageEmbed()
                    .setTitle(title)
                    .setColor("GREEN")

                message.channel.send({ content: "What should the embed description be? *type \`cancel\` to stop making the macro*", embeds: [embed] })

                setTimeout(() => message.channel.awaitMessages({ max: 1, time: 120000, errors: ["time"] }).then((collected) => {

                    if (collected.first().content == "cancel") return message.channel.send({ content: "Cancelled the macro making process. " })

                    const description = collected.first().content

                    const embedDesc = new MessageEmbed()
                        .setTitle(title)
                        .setDescription(description)
                        .setColor("GREEN")

                    message.channel.send({ content: "What should the embed footer be? (this is optional, reply with null to skip this) *type \`cancel\` to stop making the macro*", embeds: [embedDesc] })

                    setTimeout(() => message.channel.awaitMessages({ max: 1, time: 120000, errors: ["time"] }).then((collected) => {

                        if (collected.first().content == "cancel") return message.channel.send({ content: "Cancelled the macro making process. " })

                        if (collected.first().content == "null") {
                            message.channel.send({ content: "What should the embed image be? (this is optional, reply with null to skip this) *type \`cancel\` to stop making the macro*" })
                            var footer = null
                        }

                        else {
                            var footer = collected.first().content

                            const embedFooter = new MessageEmbed()
                                .setTitle(title)
                                .setDescription(description)
                                .setFooter({ text: footer })
                                .setColor("GREEN")

                            message.channel.send({ content: "What should the embed image be? (this is optional, reply with null to skip this) *type \`cancel\` to stop making the macro*", embeds: [embedFooter] })
                        }

                        setTimeout(() => message.channel.awaitMessages({ max: 1, time: 120000, errors: ["time"] }).then((collected) => {

                            if (collected.first().content == "cancel") return message.channel.send({ content: "Cancelled the macro making process. " })

                            if (collected.first().content == "null") {
                                message.channel.send({ content: `Made the macro \`${title}\`` })
                                var image = null
                            }

                            else {
                                var image = collected.first().attachments.first().attachment

                                const embedImage = new MessageEmbed()
                                    .setTitle(title)
                                    .setDescription(description)
                                    .setFooter({ text: footer })
                                    .setImage(image)
                                    .setColor("GREEN")

                                message.channel.send({ content: `Made the macro \`${name}\``, embeds: [embedImage] })
                            }

                            macos.macros.push(
                                {
                                    "name": name,
                                    "title": title,
                                    "description": description,
                                    "footer": footer,
                                    "image": image
                                }
                            )

                            fs.writeFileSync("./databases/macros.json", JSON.stringify(macos))

                        }).catch(collected => {
                            message.channel.send("The collector time has ran out, but don't worry, when you write out the warning just do the command again!")
                        }), 1000)

                    }).catch(collected => {
                        message.channel.send("The collector time has ran out, but don't worry, when you write out the warning just do the command again!")
                    }), 1000)

                }).catch(collected => {
                    message.channel.send("The collector time has ran out, but don't worry, when you write out the warning just do the command again!")
                }), 1000)

            }).catch(collected => {
                message.channel.send("The collector time has ran out, but don't worry, when you write out the warning just do the command again!")
            }), 1000)
        }
    }
}