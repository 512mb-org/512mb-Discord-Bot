const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

class memeCommand extends Command {
    constructor() {
        super('meme', {
            aliases: ['meme'],
            description: {
                content: 'Get\'s you a random reddit meme.',
                usage: '.meme',
                examples: '.meme'
            }
        });
    }

    async exec(message) {
        const ksoft = new KSoftClient(`${this.client.config.KSOFT_SI_V1_API_KEY}`);
        const { url, post: { title, subreddit, link, upvotes, downvotes, author } } = await ksoft.images.meme();
        const memeEmbed = new MessageEmbed()
            .setColor(this.client.constants.EMBED_COLOR)
            .setTitle(`${title}`)
            .setURL(`${link}`)
            .setDescription(`By **${author}** on **${subreddit}** \n\n<:upvote:772088935119454278> ${upvotes} | <:downvote:772088984683544606> ${downvotes}`)
            .setImage(`${url}`)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setTimestamp()
        return message.channel.send(memeEmbed);
    }
}


module.exports = memeCommand;