const { Command } = require('discord-akairo');

class purgeCommand extends Command {
    constructor() {
        super('purge', {
            aliases: ['purge', 'prune', 'clear', 'p'],
            description: {
                content: 'Bulk delete messages at once.',
                usage: '.purge < Amount of messages >',
                examples: '.purge 50'
            },
            clientPermissions: 'MANAGE_MESSAGES',
            userPermissions: 'MANAGE_MESSAGES',
            args: [
                {
                    id: 'purgeAmount',
                    type: 'integer',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.purgeAmount === null) {
            message.channel.send(`**ERR!** ${message.author} please provide valid amount of messages to clear.`);
        } else if (args.purgeAmount != parseInt(args.purgeAmount, 10)) {
            message.channel.send(`**ERR!** ${message.author} please provide valid amount of messages to clear.`);
        } else if (args.purgeAmount > 100) {
            message.channel.send(`**ERR!** ${message.author} DiscordAPIError: Maximum amount of messages to be bulk deleted are 100 at a time.`);
        } else {
            message.delete();
            message.channel.bulkDelete(args.purgeAmount)
                .then(messages => message.channel.send(`**Successfully deleted \`${messages.size}\`/\`${args.purgeAmount}\` messages!**`)
                    .then((msg) => { msg.delete({ timeout: 5000 }); })).catch(err => { message.channel.send(`*Error while deleting messages!* \n${err}`) });
        }
    }
};

module.exports = purgeCommand;