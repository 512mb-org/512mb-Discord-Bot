const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { UNSPLASH_ACCESS_KEY } = require('../../config.json');
const { EMBED_COLOR } = require('../../constants.json');

class unsplashCommand extends Command {
    constructor() {
        super('unsplash', {
            aliases: ['unsplash', 'us'],
            description: 'Get a random unsplash image.'
        });
    }

    async exec(message) {

        const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape`);
        const json = await response.json();
        const unsplashEmbed = new MessageEmbed()
            .setTitle(`Random Unsplash Image`)
            .setColor(EMBED_COLOR)
            .setDescription(`[Download](${json.links.download}) | [View Raw](${json.urls.raw}) | By [${json.user.name}](${json.user.links.html})`)
            .setImage(`${json.urls.regular}`)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
        message.channel.send(unsplashEmbed);
    }

}

module.exports = unsplashCommand;