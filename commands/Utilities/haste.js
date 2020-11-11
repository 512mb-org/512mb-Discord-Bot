const { Command } = require('discord-akairo');
const centra = require('@aero/centra');

class hasteCommand extends Command {
    constructor() {
        super('haste', {
            aliases: ['haste', 'hastebin', 'hb'],
            description: {
                content: 'Upload code or text to hastebin.',
                usage: '.haste < Text or Code >',
                examples: '.haste cats are cute.'
            },
            args: [
                {
                    id: 'hasteInput',
                    type: 'string',
                    match: 'content',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.hasteInput === null) {
            message.channel.send(`**ERR!** ${message.author} Please provide code or text to hastebin!`);
        } else {
            const { key } = await centra(this.client.config.HASTEBIN_URL, 'POST')
                .path('documents')
                .body(args.hasteInput)
                .json();

            return message.channel.send(`${message.author} ${this.client.config.HASTEBIN_URL}/${key}`);
        }

    }
};

module.exports = hasteCommand;