const { Command } = require('discord-akairo');

class echoCommand extends Command {
    constructor() {
        super('echo', {
            aliases: ['echo'],
            description: {
                content: 'Send a message using this bot.',
                usage: '.echo < Text >',
                examples: '.echo Hello World!',
            },
            args: [
                {
                    id: 'echoArg',
                    type: 'string',
                    match: 'content',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.echoArg === null) {
            await message.react(this.client.constants.EMOTE_CROSS[1]);
            return message.channel.send(`**ERR!** ${message.author} please specify something to echo!`);
        } else {
            let toTrim = this.client.config.PREFIX.length + 4;
            await message.react(this.client.constants.EMOTE_CHECK[1]);
            message.channel.send(`${message.cleanContent.slice(toTrim)} \n** **\n*Sent by ${message.author.tag} (${message.author.id})*`)
        }
    }
};

module.exports = echoCommand;