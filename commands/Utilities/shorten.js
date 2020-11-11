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
                let rsurl = await centra('https://api.short.cm/links', 'POST')
                    .header({
                        authorization: this.client.config.SHORT_IO.SECRET_KEY
                    })
                    .body({ originalURL: args.longURL, domain: this.client.config.SHORT_IO.DOMAIN, allowDuplicates: false }, 'json')
                    .json();

                message.channel.send(`${message.author} ${rsurl.shortURL}`);
            } else {
                let rsurl = await centra('https://api.short.cm/links', 'POST')
                    .header({
                        authorization: this.client.config.SHORT_IO.SECRET_KEY
                    })
                    .body({ originalURL: args.longURL, domain: this.client.config.SHORT_IO.DOMAIN, allowDuplicates: false, path: args.slug }, 'json')
                    .json();
                if (rsurl.success == false && rsurl.error === "Link already exists") {
                    return message.channel.send(`**ERR!** ${this.client.constants.EMOTE_CROSS[0]} ${message.author} The slug \`${args.slug}\` already exists!`);
                } else {
                    return message.channel.send(`${message.author} ${rsurl.shortURL}`);
                }

            }
        }
    }
};

module.exports = shortenCommand;