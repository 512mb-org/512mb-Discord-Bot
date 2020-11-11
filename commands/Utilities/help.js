const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class helpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: {
                content: 'Display\'s the help command',
                usage: '.help < OPTIONAL: Command >',
                examples: '.help changemymind'
            },
            args: [
                {
                    id: 'helpArg',
                    type: 'commandAlias',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.helpArg === null) {
            const helpEmbed = new MessageEmbed()
                .setTitle(`Help`)
                .setColor(this.client.constants.EMBED_COLOR)
                .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                .setTimestamp()

            this.handler.categories.map((a, b) => {
                if (!(b === "Bot Owner")) {
                    helpEmbed.addField(`${b}`, a.map((c) => `\`${c.aliases[0]}\``).join(", "));
                };
            });

            message.channel.send(helpEmbed);
        } else {
            const specificHelpEmbed = new MessageEmbed()
                .setTitle(`Help for ${args.helpArg}`)
                .setColor(this.client.constants.EMBED_COLOR)
                .setDescription(`${this.handler.modules.get(`${args.helpArg}`).description.content}`)
                .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                .setTimestamp()
            specificHelpEmbed.addField(`Aliases`, `\`${this.handler.modules.get(`${args.helpArg}`).aliases.join('`, `')}\``);
            specificHelpEmbed.addField(`Usage`, `\`${this.handler.modules.get(`${args.helpArg}`).description.usage}\``);
            specificHelpEmbed.addField(`Examples`, `\`${this.handler.modules.get(`${args.helpArg}`).description.examples}\``)
            message.channel.send(specificHelpEmbed);
        }

    }
};

module.exports = helpCommand;