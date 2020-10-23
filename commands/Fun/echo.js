const { Command } = require('discord-akairo');

class echoCommand extends Command {
    constructor() {
        super('echo', {
            aliases: ['echo'],
            description: 'Send a message using this bot.',
            args: [
                {
                    id: 'echoArg',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.echoArg === null) {
            return message.channel.send(`**ERR!** ${message.author} please specify something to echo!`);
        } else {
            await message.react('✔');
            message.channel.send(`${args.echoArg.replace(/@/g, "@‎")} \n** **\n*Sent by ${message.author.tag} (${message.author.id})*`)
        }
    }
};

module.exports = echoCommand;