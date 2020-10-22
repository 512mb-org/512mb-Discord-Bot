const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class sourceCommand extends Command {
    constructor() {
        super('source', {
            aliases: ['source'],
            description: 'Check the bot\s source code.'
        });
    }

    async exec(message) {
        const sourceEmbed = new MessageEmbed()
            .setTitle(`[512mb Discord Bot's Source Code](https://github.com/512mb-xyz/512mb-Discord-Bot)`)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id}).`, `${message.author.avatarURL({ dynamic: true })}`)
            .setTimestamp()
        
        return message.channel.send(sourceEmbed);
    }
};

module.exports = stealCommand;