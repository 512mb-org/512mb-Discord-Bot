const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class kickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick', '409', 'boot', 'k'],
            description: {
                content: 'Kick a member from a guild.',
                usage: '.kick < Member ID / Mention >',
                examples: 'kick 688715868687040582'
            },
            userPermissions: 'KICK_MEMBERS',
            clientPermissions: 'KICK_MEMBERS',
            args: [
                {
                    id: 'kickArg',
                    type: 'member',
                    default: null
                },
                {
                    id: 'kickReason',
                    match: 'content',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {

        let kickMember = args.kickArg;
        if (!kickMember) return message.channel.send(`**ERR!** ${message.author} Please provide a user to kick!`);

        let kickReason = args.kickReason;
        if (!kickReason) kickReason = `Kicked by ${message.author.id} | No reason given.`;

        message.delete();
        const kickEmbed = new MessageEmbed()
            .setColor(this.client.constants.EMBED_COLOR)
            .setDescription(`Hello! You have been kicked from ${message.guild.name}! \nReason: \`${kickReason}\` \nKicked by: <@${message.author.id}>`)
            .setFooter(`512mb Bot.`, `${this.client.constants.AVATAR}`)
            .setTimestamp()


        if (kickMember.id === message.author.id) {
            message.channel.send(`**ERR!** Nice try! You can't kick your self.`)
        } else {
            message.channel.send(typeof kickReason + ` ${kickReason}`)
            kickMember.send(kickEmbed).then(() => kickMember.kick(`${kickReason}`)).catch(err => message.channel.send(`${err}`));

            message.channel.send(`**${kickMember.user.tag}** has been kicked from **${message.guild.name}** by **${message.author}** for **${kickReason}**`);
        }
    }

}

module.exports = kickCommand;