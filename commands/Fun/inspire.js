const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const centra = require('@aero/centra');

class inspireCommand extends Command {
    constructor() {
        super('inspire', {
            aliases: ['inspire-me', 'inspiration', 'ime'],
            description: {
                content: 'Get a Random AI Generated inspirational thought/quote.',
                usage: '.inspire-me',
                examples: '.inspire-me'
            }
        });
    }

    async exec(message) {
        const res = await centra(`https://inspirobot.me/api?generate=true`).text();
        const inspireembed = new MessageEmbed()
            .setTitle(`Get inspired...`)
            .setColor(this.client.constants.EMBED_COLOR)
            .setImage(res)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setTimestamp()
        message.channel.send(inspireembed);
    }
};

module.exports = inspireCommand;