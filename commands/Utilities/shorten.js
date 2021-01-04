const { Command } = require('discord-akairo');
const centra = require('@aero/centra');

class shortenCommand extends Command {
    constructor() {
        super('shorten', {
            aliases: ['shorten', 'shortenlink', 'sl'],
            description: {
                content: 'Shorten a long link.',
                usage: '.shorten < Long URL > < OPTIONAL: Custom Slug >',
                examples: '.shorten https://google.com google'
            },
            args: [
                {
                    id: 'longURL',
                    type: 'string',
                    default: null
                },
                {
                    id: 'slug',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.longURL === null) {
            return message.channel.send(`**ERR!** ${message.author} Please provide a link to shorten!`);
        } else {
            if (args.slug === null) {
                let rsurl = await centra(`https://512mb.cf/api/new?url=${args.longURL}`, 'GET').json();
                message.channel.send(`${message.author} ${rsurl.shortUrl}`);
            } else {
                let rsurl = await centra(`https://512mb.cf/api/new?url=${args.longURL}&slug=${args.slug}`, 'GET').json();
                if (rsurl.status != 200 && rsurl.message == 'This Slug has already been taken!') {
                    return message.channel.send(`**ERR!** ${this.client.constants.EMOTE_CROSS[0]} ${message.author} The slug \`${args.slug}\` already exists!`);
                } else {
                    return message.channel.send(`${message.author} ${rsurl.shortUrl}`);
                }

            }
        }
    }
};

module.exports = shortenCommand;
