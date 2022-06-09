const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "latest",
    description: "The latest release of Noodle Extensions/Heck",
    async execute(message, args) {
        const data = await fetch("https://api.github.com/repos/Aeroluna/Heck/releases").then(res => res.json())
        const repo = await fetch("https://api.github.com/repos/Aeroluna/Heck").then(res => res.json())

        const embed = new MessageEmbed()
            .setTitle(`${data[0].name}`)
            .setColor("RANDOM")
            .setThumbnail(`${data[0].author.avatar_url}`)
            .setDescription(`${data[0].body}\n\nStar count: ${repo.stargazers_count} :star:\nIssues: ${repo.open_issues}\nForks: ${repo.forks}`)

        const buttonRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Releases Page")
                    .setStyle("LINK")
                    .setURL("https://github.com/Aeroluna/Heck/releases/latest"),
                new MessageButton()
                    .setLabel("Repository")
                    .setStyle("LINK")
                    .setURL("https://github.com/Aeroluna/Heck")
            )
        
        message.channel.send({ embeds: [embed], components: [buttonRow] })
    }
}