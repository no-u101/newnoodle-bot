const fetch = require("node-fetch")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
    name: "randid",
    description: "Links a random map from beatsaver",
    async execute(message, args) {
        function Random(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

        const randomPage = Random(0, 2000)
        const randomMap = Random(0, 19)

        const maps = await fetch(`https://api.beatsaver.com/search/text/${randomPage}?sortOrder=Latest`).then(res => res.json())

        const map = maps.docs[randomMap]

        const embed = new MessageEmbed()
            .setTitle(`${map.name}`)
            .setURL(`https://beatsaver.com/maps/${map.id}`)
            .setThumbnail(`${map.versions[0].coverURL}`)
            .setColor("RANDOM")
            .setDescription(`${map.description}`)
            .setAuthor({ name: `Uploaded by ${map.uploader.name}`, url: `https://beatsaver.com/profile/${map.uploader.id}`, iconURL: `${map.uploader.avatar}` })

        const buttonRow = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("OneClick map")
                    .setStyle("LINK")
                    .setURL(`https://stormpacer.me/beatsaver?id=${map.id}`),
                new MessageButton()
                    .setLabel("Map Page")
                    .setStyle("LINK")
                    .setURL(`https://beatsaver.com/maps/${map.id}`),
                new MessageButton()
                    .setLabel("Mapper Page")
                    .setStyle("LINK")
                    .setURL(`https://beatsaver.com/profile/${map.uploader.id}`)
            )
        message.channel.send({ embeds: [embed], components: [buttonRow] })
    }
}