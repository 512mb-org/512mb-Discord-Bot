const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class banCommmand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban', 'banish', 'b', 'yeet', 'bean', 'barn', '410', 'perish', 'begone'],
            description: {
                content: 'Ban a member from a guild.',
                usage: '.ban < Member ID / Mention >',
                examples: '.ban 688715868687040582'
            },
            userPermissions: 'BAN_MEMBERS',
            clientPermissions: 'BAN_MEMBERS',
            args: [
                {
                    id: 'banArg',
                    type: 'member',
                    default: null
                },
                {
                    id: 'banReason',
                    match: 'content',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {

        let banMember = args.banArg;
        if (!banMember) return message.channel.send(`**ERR!** ${message.author} Please provide a user to ban!`);

        let banReason = args.banReason;
        if (!banReason) banReason = `Banned by ${message.author.id} | No reason given.`;

        message.delete();
        const banEmbed = new MessageEmbed()
            .setColor(this.client.constants.EMBED_COLOR)
            .setDescription(`Hello! You have been banned from ${message.guild.name}! \nReason: \`${banReason}\` \nBanned by: <@${message.author.id}>`)
            .setFooter(`512mb Bot.`, `${this.client.constants.AVATAR}`)
            .setTimestamp()


        if (banMember.id === message.author.id) {
            message.channel.send(`**ERR!** Nice try! You can't ban your self.`)
        } else {
            banMember.send(banEmbed).then(() => banMember.ban({ reason: `${banReason}` })).catch(err => message.channel.send(`${err}`));

            message.channel.send(`**${banMember.user.tag}** has been banned from **${message.guild.name}** by **${message.author}** for **${banReason}**`);
        }
    }

}

module.exports = banCommmand;