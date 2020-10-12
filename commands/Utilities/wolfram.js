const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { WOLFRAM_APP_ID } = require('../../config')

class mathCommand extends Command {
    constructor() {
        super('wolfram', {
            aliases: ['wolfram', 'wa'],
            args: [
                {
                    id: 'waArg',
                    type: 'string',
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
            const response = await fetch(`http://api.wolframalpha.com/v2/result?appid=${WOLFRAM_APP_ID}&i=${wolframInput}`);
            const body = await response.text();
            const wolframEmbed = new MessageEmbed()
                .setTitle(`${body}`)
                .setColor(0x2EC02A)
                .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            message.channel.send(wolframEmbed);
        }
    }

}

module.exports = mathCommand;