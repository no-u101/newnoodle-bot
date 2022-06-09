
const { prefix, owner } = require("../config.json");
const stopPhishing = require('stop-discord-phishing');
const { MessageEmbed } = require("discord.js");

const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

async function checkMessage(message) {
	const isGrabber = await stopPhishing.checkMessage(message)

	return isGrabber
}

module.exports = {
	name: "messageCreate",
	async execute(message) {

		const channel = message.guild.channels.cache.get("935171555925819452")

		const { client, content} = message;

		if (
			message.content == `<@${client.user.id}>` ||
			message.content == `<@!${client.user.id}>`
		) {
			require("../messages/onMention").execute(message)
			return
		}

		const checkPrefix = prefix.toLowerCase()

		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
		);

		if (!prefixRegex.test(content.toLowerCase())) return

		const [matchedPrefix] = content.toLowerCase().match(prefixRegex)

		const args = content.slice(matchedPrefix.length).trim().split(/ +/)

		const commandName = args.shift().toLowerCase()

		if (!message.content.startsWith(matchedPrefix) || message.author.bot)
			return

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		if (!command) return

		if (command.ownerOnly && message.author.id !== owner) {
			return message.reply({ content: "This is an owner only command!" })
		}

		if (command.guildOnly && message.channel.type === "dm") {
			return message.reply({
				content: "I can't execute that command inside DMs!"
			})
		}

		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply({ content: "You can't do this!" })
			}
		}

		if (command.args && !args.length) {
			let reply = `You didn't provide any arguments, ${message.author}!`

			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
			}

			return message.channel.send({ content: reply })
		}

		const fish = checkMessage(message.content)

		if (fish == true) {
			try {
				message.delete()
				const embed = new MessageEmbed()
					.setTitle("Phishing link kick")
					.setColor("RED")
					.setDescription(`Kicked \`${message.author.username}\` for sending a phishing link.\n\n**Message content:**\n\`\`\`${message.content}\`\`\``)

				message.author.kick("Phishing link")

				channel.send({ embeds: [embed] })
			} catch (err) {
				console.log(err)
			}
		}

		try {
			command.execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply({
				content: "Something went wrong",
			})
		}
	}
}
