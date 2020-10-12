const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class inspireCommand extends Command {
    constructor() {
        super('inspire', {
            aliases: ['inspire-me', 'inspiration', 'ime'],
        });
    }

    async exec(message) {
        const response = await fetch('https://inspirobot.me/api?generate=true');
        const body = await response.text();
        const inspireembed = new MessageEmbed()
            .setTitle(`Get inspired...`)
            .setColor(0x2EC02A)
            .setImage(body)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
        message.channel.send(inspireembed);
    }
};

module.exports = inspireCommand;