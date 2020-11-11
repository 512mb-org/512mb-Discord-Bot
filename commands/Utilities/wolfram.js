const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const centra = require('@aero/centra');

class wolframCommand extends Command {
    constructor() {
        super('wolfram', {
            aliases: ['wolfram', 'wa'],
            description: {
                content: 'Use Wolfram|Alpha\'s search engine to search stuff, duh.',
                usage: '.wolfram < Query >',
                examples: '.wolfram 2 + 2'
            },
            args: [
                {
                    id: 'waArg',
                    type: 'string',
                    match: 'content',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.waArg === null) {
            message.channel.send(`**ERR!** ${message.author} please provide a query to search on wolfram!`);
        } else {
            const wolframInput = encodeURI(args.waArg)
            const res = await centra(`http://api.wolframalpha.com/v2/result?appid=${this.client.config.WOLFRAM_APP_ID}&i=${wolframInput}`, 'GET').text();

            const wolframEmbed = new MessageEmbed()
                .setTitle(`${res}`)
                .setColor(this.client.constants.EMBED_COLOR)
                .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            return message.channel.send(wolframEmbed);
        }
    }

}

module.exports = wolframCommand;