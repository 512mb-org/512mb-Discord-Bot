const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class sourceCommand extends Command {
    constructor() {
        super('source', {
            aliases: ['source'],
            description: {
                content: 'Check the bot\'s source code.',
                usage: '.source',
                examples: '.source'
            }
        });
    }

    async exec(message) {
        const sourceEmbed = new MessageEmbed()
            .setTitle(`512mb Discord Bot's Source Code`)
            .setURL(`https://github.com/512mb-xyz/512mb-Discord-Bot`)
            .setDescription(`Check out my source code on GitHub!`)
            .setColor(this.client.constants.EMBED_COLOR)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id}).`, `${message.author.avatarURL({ dynamic: true })}`)
            .setTimestamp()

        return message.channel.send(sourceEmbed);
    }
};

module.exports = sourceCommand;