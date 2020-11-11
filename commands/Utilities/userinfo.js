const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class userinfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'info', 'ui', 'i'],
            description: {
                content: 'Check a discord user\'s account info.',
                usage: '.userinfo < OPTIONAL: Member ID / Mention >',
                examples: '.userinfo 688715868687040582'
            },
            args: [
                {
                    id: 'userinfoMember',
                    type: 'member',
                    default: null
                }
            ]
        });
    }


    async exec(message, args) {

        let member = args.userinfoMember;
        const userinfoEmbed = new MessageEmbed()
            .setColor(this.client.constants.EMBED_COLOR)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setTimestamp()

        if (args.userinfoMember === null) {

            let roles = message.member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.name.toString())
                .slice(0, -1);

            userinfoEmbed.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true, size: 512 })}`)
            userinfoEmbed.setAuthor(`${message.author.tag} (${message.author.id})`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            userinfoEmbed.addField(`About`, [
                `**❯ User:** ${message.author.tag}`,
                `**❯ ID:** ${message.author.id}`,
                `**❯ Joined Discord on:** ${message.member.user.createdAt.toGMTString()}`,
                `\u200b`
            ]);

            userinfoEmbed.addField(`Member`, [
                `**❯ Roles [${roles.length}]:** \n\`${roles.join('`, `')}\``,
                `\u200b`
            ]);

            message.channel.send(userinfoEmbed);

        } else {

            let roles = message.member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.name.toString())
                .slice(0, -1);

            userinfoEmbed.setThumbnail(`${member.user.displayAvatarURL({ dynamic: true, size: 512 })}`)
            userinfoEmbed.setAuthor(`${member.user.tag} (${member.user.id})`, `${member.user.displayAvatarURL({ dynamic: true })}`)
            userinfoEmbed.addField(`About`, [
                `**❯ User:** ${member.user.tag}`,
                `**❯ ID:** ${member.user.id}`,
                `**❯ Joined Discord on:** ${member.user.createdAt.toGMTString()}`,
                `\u200b`
            ]);

            userinfoEmbed.addField(`Member`, [
                `**❯ Roles [${roles.length}]:** \n\`${roles.join('`, `')}\``,
                `\u200b`
            ]);

            message.channel.send(userinfoEmbed);

        }
    }
}

module.exports = userinfoCommand;