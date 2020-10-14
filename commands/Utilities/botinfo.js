const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class botinfoCommand extends Command {
    constructor() {
        super('botinfo', {
            aliases: ['botinfo'],
            description: 'Check this bot\'s botinfo.'
        });
    }

    async exec(message) {
        const botinfoEmbed = new MessageEmbed()
            .setTitle('512mb Bot botinfo')
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setColor(0x2EC02A)
        let totalSeconds = (this.client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);

        let uptime = `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds`;

        botinfoEmbed.addField(`Uptime`, `\`${uptime}\``, true);
        botinfoEmbed.addField(`Guilds`, `\`${this.client.guilds.cache.size} guilds\``, true)
        botinfoEmbed.addField(`Users`, `\`${this.client.users.cache.size} users\``, true)

        message.channel.send(botinfoEmbed);
    }
};

module.exports = botinfoCommand;