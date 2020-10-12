const { Command, CommandHandler } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class helpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help'],
        });
    }

    async exec(message) {
        
        const helpEmbed = new MessageEmbed()
            .setTitle(`Help`)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id}).`)
            .setTimestamp()
            .setColor(0x2EC02A)

        
            //for (const category of this.handler.categories.values()) {category.map(command=>message.channel.send(`${command.aliases} ${command.category}`))};

        this.handler.categories.map((a, b) => {
            helpEmbed.addField(
                `${b}`,
                a.map((c) => `\`${c.aliases[0]}\``).join(", ")
            )
            });
            
        message.channel.send(helpEmbed);
    }
};

module.exports = helpCommand;