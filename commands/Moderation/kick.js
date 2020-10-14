const { Command } = require('discord-akairo');
const { GuildMember } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { EMBED_COLOR, AVATAR } = require('../../constants.json');

class kickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick', '409', 'boot', 'k'],
            description: `This command kicks a user from the guild.`,
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
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {

        let kickMember = args.kickArg;
        if(!kickMember) return message.channel.send(`**ERR!** ${message.author} Please provide a user to kick!`);

        let kickReason = args.kickReason;
        if(!kickReason) kickReason = `Kicked by ${message.author.id} | No reason given.`;

        message.delete();
        const kickEmbed = new MessageEmbed()
            .setColor(EMBED_COLOR)
            .setDescription(`Hello! You have been kicked from ${message.guild.name}! \nReason: \`${kickReason}\` \nKicked by: <@${message.author.id}>`)
            .setFooter(`512mb Bot.`, `${AVATAR}`)
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