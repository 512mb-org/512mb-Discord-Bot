const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

class unsplashCommand extends Command {
    constructor() {
        super('unsplash', {
            aliases: ['unsplash', 'us'],
            description: {
                content: 'Get a random unsplash image.',
                usage: '.unsplash',
                examples: '.unsplash'
            }
        });
    }

    async exec(message) {

        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${this.client.config.UNSPLASH_ACCESS_KEY}&orientation=landscape`);
        const json = await response.json();
        const unsplashEmbed = new MessageEmbed()
            .setTitle(`Random Unsplash Image`)
            .setColor(this.client.constants.EMBED_COLOR)
            .setDescription(`[Download](${json.links.download}) | [View Raw](${json.urls.raw}) | By [${json.user.name}](${json.user.links.html})`)
            .setImage(`${json.urls.regular}`)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
        message.channel.send(unsplashEmbed);
    }

}

module.exports = unsplashCommand;