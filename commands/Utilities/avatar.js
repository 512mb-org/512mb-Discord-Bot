const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

class avatarCommand extends Command {
    constructor() {
        super('avatar', {
            aliases: ['avatar', 'av'],
            description: {
                content: 'Check a discord user\'s avatar.',
                usage: '.avatar < OPTIONAL: Member ID / Mention >',
                examples: '.avatar 688715868687040582'
            },
            args: [
                {
                    id: 'avatarMember',
                    type: 'member',
                    default: null
                }
            ]
        });
    }


    async exec(message, args) {

        let member = args.avatarMember;
        const avatarEmbed = new MessageEmbed()
            .setColor(this.client.constants.EMBED_COLOR)


        if (args.avatarMember === null) {

            avatarEmbed.setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            avatarEmbed.setDescription(`[png](${message.author.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' })}) | [jpg](${message.author.displayAvatarURL({ dynamic: true, size: 2048, format: 'jpg' })}) | [webp](${message.author.displayAvatarURL({ dynamic: true, size: 2048, format: 'webp' })}) \n[16](${message.author.displayAvatarURL({ dynamic: true, size: 16 })}) | [32](${message.author.displayAvatarURL({ dynamic: true, size: 32 })}) | [64](${message.author.displayAvatarURL({ dynamic: true, size: 64 })}) | [128](${message.author.displayAvatarURL({ dynamic: true, size: 128 })}) | [256](${message.author.displayAvatarURL({ dynamic: true, size: 256 })}) | [512](${message.author.displayAvatarURL({ dynamic: true, size: 512 })}) | [1024](${message.author.displayAvatarURL({ dynamic: true, size: 1024 })}) | [2048](${message.author.displayAvatarURL({ dynamic: true, size: 2048 })})`);
            avatarEmbed.setImage(`${message.author.displayAvatarURL({ dynamic: true, size: 2048 })}`);

            message.channel.send(avatarEmbed);

        } else {

            avatarEmbed.setAuthor(`${member.user.tag}`, `${member.user.displayAvatarURL({ dynamic: true })}`)
            avatarEmbed.setDescription(`[png](${member.user.displayAvatarURL({ dynamic: true, size: 2048, format: 'png' })}) | [jpg](${member.user.displayAvatarURL({ dynamic: true, size: 2048, format: 'jpg' })}) | [webp](${member.user.displayAvatarURL({ dynamic: true, size: 2048, format: 'webp' })}) \n[16](${member.user.displayAvatarURL({ dynamic: true, size: 16 })}) | [32](${member.user.displayAvatarURL({ dynamic: true, size: 32 })}) | [64](${member.user.displayAvatarURL({ dynamic: true, size: 64 })}) | [128](${member.user.displayAvatarURL({ dynamic: true, size: 128 })}) | [256](${member.user.displayAvatarURL({ dynamic: true, size: 256 })}) | [512](${member.user.displayAvatarURL({ dynamic: true, size: 512 })}) | [1024](${member.user.displayAvatarURL({ dynamic: true, size: 1024 })}) | [2048](${member.user.displayAvatarURL({ dynamic: true, size: 2048 })})`);
            avatarEmbed.setImage(`${member.user.displayAvatarURL({ dynamic: true, size: 2048 })}`)

            message.channel.send(avatarEmbed);

        }
    }
}

module.exports = avatarCommand;