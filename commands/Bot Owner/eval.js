const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');
const constants = require('../../constants.json');

class evalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            ownerOnly: true,
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
            .setColor(constants.EMBED_COLOR)
            .addField(`Input`, `\`\`\`Javascript
${args.evalArg}\`\`\``)
            .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
            .setTimestamp()

        try {
            if (args.evalArg === null) {
                message.channel.send(`**ERR!** ${message.author} \`Cannot evaluate air!\``)
            } else {
                let evaluated = inspect(eval(args.evalArg, { depth: 0 } ));
                let hrStart = process.hrtime();
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                evalEmbed.addField(`Output`, `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
                evalEmbed.addField(`Type`, `\`\`\`nim
${typeof evaluated}\`\`\``)
                evalEmbed.setThumbnail('https://cdn.bongo.ninja/bzfcDy0.png');
                message.channel.send(evalEmbed);
                message.react(`${constants.EMOTE_CHECK}`)
            }
        } catch(e) {
            evalEmbed.addField(`Error`, `\`\`\`nim
${e.message}\`\`\``)
            evalEmbed.setThumbnail('https://cdn.bongo.ninja/OxOzVEX.png');
            message.channel.send(evalEmbed);
            message.react(`${constants.EMOTE_CROSS}`)
        }
    }
};

module.exports = evalCommand;