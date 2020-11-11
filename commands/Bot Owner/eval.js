const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');

class evalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            ownerOnly: true,
            description: {
                content: 'Eval command for owners only lol.',
                usage: '.eval < JavaScript Code >',
                examples: '.eval message.channel.send(\'Hello World!\')'
            },
            args: [
                {
                    id: 'evalArg',
                    type: 'string',
                    default: null,
                    match: 'content'
                }
            ]
        });
    }

    async exec(message, args) {
        const evalEmbed = new MessageEmbed()
            .setTitle(`Evaluated \`${args.evalArg}\``)
            .setColor(this.client.constants.EMBED_COLOR)
            .addField(`Input`, `\`\`\`Javascript
${args.evalArg}\`\`\``)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setTimestamp()

        try {
            if (args.evalArg === null) {
                message.channel.send(`**ERR!** ${message.author} \`Cannot evaluate air!\``)
            } else {
                let evaluated = inspect(eval(args.evalArg, { depth: 0 }));
                let hrStart = process.hrtime();
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                evalEmbed.addField(`Output`, `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
                evalEmbed.addField(`Type`, `\`\`\`nim
${typeof evaluated}\`\`\``)
                evalEmbed.setThumbnail(`${this.client.constants.IMAGE_CHECK}`);
                message.channel.send(evalEmbed);
                message.react(this.client.constants.EMOTE_CHECK[1])
            }
        } catch (e) {
            evalEmbed.addField(`Error`, `\`\`\`nim
${e.message}\`\`\``)
            evalEmbed.setThumbnail(`${this.client.constants.IMAGE_CROSS}`);
            message.channel.send(evalEmbed);
            message.react(this.client.constants.EMOTE_CROSS[1])
        }
    }
};

module.exports = evalCommand;