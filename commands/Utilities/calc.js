const { Command } = require('discord-akairo');
const math = require('mathjs');
const { MessageEmbed } = require('discord.js');

class calcCommand extends Command {
    constructor() {
        super('calc', {
            aliases: ['calc'],
            description: {
                content: 'Calculate Mathemtical Expressions.',
                usage: '.calc < Mathematical Expression >',
                examples: '.calc 2 + 2` \n`.calc sin(90)'
            },
            args: [
                {
                    id: 'expression',
                    match: 'content',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.expression === null) {
            message.channel.send(`**ERR!** ${message.author} Please provide a mathematical expression to calculate.`);
        } else {
            try {
                const resp = math.evaluate(args.expression);

                const calcEmbed = new MessageEmbed()
                    .setTitle(`Calculated!`)
                    .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                    .setColor(this.client.constants.EMBED_COLOR)
                    .setTimestamp()
                    .addFields([
                        {
                            name: 'Input', value: `\`\`\`CSS
${args.expression}\`\`\``
                        },
                        {
                            name: 'Output', value: `\`\`\`CSS
${resp}\`\`\``
                        }
                    ]);

                message.channel.send(calcEmbed);
            } catch (err) {
                message.channel.send(`**ERR!** ${message.author} ${err}`)
            }
        }
    }
};

module.exports = calcCommand;