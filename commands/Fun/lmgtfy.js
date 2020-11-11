const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class lmgtfyCommand extends Command {
    constructor() {
        super('lmgtfy', {
            aliases: ['lmgtfy'],
            description: 'Lmgtfy-ies a query.',
            description: {
                content: 'Lmgtfy-ies a query.',
                usage: '.lmgtfy < Query >',
                examples: '.lmgtfy How do I not ask stupid questions in chat?'
            },
            args: [
                {
                    id: 'lmgtfyQuery',
                    type: 'string',
                    match: 'content',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.lmgtfyQuery === null) {
            message.channel.send(`${message.author} Please provide a query to Lmgtfy!`);
        } else {
            let lmgtfyQuery = encodeURI(args.lmgtfyQuery);
            const lmgtfyEmbed = new MessageEmbed()
                .setColor(this.client.constants.EMBED_COLOR)
                .setTitle(`Lmgtfy-ied ${args.lmgtfyQuery}`)
                .setURL(`https://lmgtfy.app/?q=${lmgtfyQuery}&iie=1`)
                .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send(lmgtfyEmbed);
        }
    }
};

module.exports = lmgtfyCommand;