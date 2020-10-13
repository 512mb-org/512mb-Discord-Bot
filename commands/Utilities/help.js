const { Command, CommandHandler } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class helpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            description: `This command show's you the help command}`,
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
            .setColor(0x2EC02A)
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
                .setColor(0x2EC02A)
                .setDescription(`${this.handler.modules.get(`${args.helpArg}`).description}`)
                .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                .setTimestamp()
            specificHelpEmbed.addField(`Aliases`, `\`${this.handler.modules.get('wolfram').aliases.join('`, `')}\``)
            message.channel.send(specificHelpEmbed);
        }

    }
};

module.exports = helpCommand;