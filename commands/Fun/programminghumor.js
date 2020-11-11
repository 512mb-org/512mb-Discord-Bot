const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

class programminghumorCommand extends Command {
    constructor() {
        super('programminghumor', {
            aliases: ['programminghumor', 'ph'],
            description: {
                content: 'Get\'s you a random post from the subreddit, `r/programminghumor`.',
                usage: '.programminghumor',
                examples: '.programminghumor'
            }
        });
    }

    async exec(message) {
        const ksoft = new KSoftClient(`${this.client.config.KSOFT_SI_V1_API_KEY}`);
        const { url, post: { title, subreddit, link, upvotes, downvotes, author } } = await ksoft.images.reddit('programminghumor', { removeNSFW: true, span: 'year' });
        const phEmbed = new MessageEmbed()
            .setColor(this.client.constants.EMBED_COLOR)
            .setTitle(`${title}`)
            .setURL(`${link}`)
            .setDescription(`By **${author}** on **${subreddit}** \n\n<:upvote:772088935119454278> ${upvotes} | <:downvote:772088984683544606> ${downvotes}`)
            .setImage(`${url}`)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(phEmbed);
    }
}


module.exports = programminghumorCommand;