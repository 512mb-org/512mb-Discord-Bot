const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            clientPermissions: 'MANAGE_GUILD',
            userPermissions: 'MANAGE_GUILD',
            description: {
                content: 'Display or change server prefix.',
                usage: '.prefix < OPTIONAL: Prefix >',
                examples: '.prefix\` \n\`.prefix !'
            },
            args: [
                {
                    id: 'prefix',
                    default: null
                }
            ],
            channel: 'guild'
        });
    }

    async exec(message, args) {
        if (args.prefix === null) {
            message.channel.send(`Current Server Prefix: \`${this.client.settings.get(message.guild.id, 'prefix', this.client.config.PREFIX)}\``)
        } else {
            const oldPrefix = this.client.settings.get(message.guild.id, 'prefix', this.client.config.PREFIX);

            await this.client.settings.set(message.guild.id, 'prefix', args.prefix);
            return message.reply(`Prefix for this guild has been changed from \`${oldPrefix}\` to \`${args.prefix}\``);
        }
    }
}

module.exports = PrefixCommand;