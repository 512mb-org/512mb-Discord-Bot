const { Command } = require('discord-akairo');
const { KSoftClient } = require('@ksoft/api');
const { MessageEmbed } = require('discord.js');

class lyricsCommand extends Command {
    constructor() {
        super('lyrics', {
            aliases: ['lyrics', 'ly'],
            description: {
                content: 'Get\'s you the lyrics of a song.',
                usage: '.lyrics < Song >',
                examples: '.lyrics The Resistance - Muse'
            },
            args: [
                {
                    id: 'song',
                    type: 'string',
                    match: 'content',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.song === null) {
            message.channel.send(`**ERR!** ${message.author} Please provide a song to search lyrics for!`);
        } else {
            const ksoft = new KSoftClient(this.client.config.KSOFT_SI_V1_API_KEY);
            const Track = await ksoft.lyrics.get(args.song, {});
            const lyricsEmbed = new MessageEmbed()
                .setTitle(`Lyrics for ${Track.name}`)
                .setURL(Track.url)
                .setColor(this.client.constants.EMBED_COLOR)
                .setThumbnail(Track.artwork)
                .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                .setTimestamp();
            if (Track.lyrics.length >= 1950) {
                lyricsEmbed.setDescription(`${Track.lyrics.slice(0, -250)}...`);
            } else {
                lyricsEmbed.setDescription(`${Track.lyrics}`);
            };
            return message.channel.send(lyricsEmbed);
        }

    }
}


module.exports = lyricsCommand;