const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class inviteCommand extends Command {
    constructor() {
        super('invite', {
            aliases: ['invite'],
            description: {
                content: 'Get this bot\'s invite link.',
                usage: '.invite',
                examples: '.invite'
            }
        });
    }

    async exec(message) {
        const inviteEmbed = new MessageEmbed()
            .setTitle(`Invite me!`)
            .setURL(`https://discord.com/oauth2/authorize?client_id=${this.client.config.CLIENT_ID}&permissions=40&scope=bot`)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setColor(this.client.constants.EMBED_COLOR)
            .setTimestamp();
        message.channel.send(inviteEmbed);
    }
};

module.exports = inviteCommand;