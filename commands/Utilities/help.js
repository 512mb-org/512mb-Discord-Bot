const { Command, CommandHandler } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class helpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
            args: [
                {
                    id: 'helpArg',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.helpArg === null) {
            const helpEmbed = new MessageEmbed()
            .setTitle(`Help`)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id}).`)
            .setTimestamp()
            .setColor(0x2EC02A)

            this.handler.categories.map((a, b) => {
                if (!(b === "Bot Owner")) {
                    helpEmbed.addField(`${b}`, a.map((c) => `\`${c.aliases[0]}\``).join(", "))
                }
            });
                
            message.channel.send(helpEmbed);
        }

    }
};

module.exports = helpCommand;