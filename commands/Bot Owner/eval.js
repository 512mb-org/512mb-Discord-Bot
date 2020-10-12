const { Command } = require('discord-akairo');
const { inspect } = require('util');
// const { MessageEmbed } = require('discord.js');

class evalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval'],
            ownerOnly: true,
            args: [
                {
                    id: 'evalArg',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        try {
            if (args.evalArg === null) {
                message.channel.send(`**ERR!** ${message.author} \`Cannot evaluate air!\``)
            } else {
                let evaluated = inspect(eval(args.evalArg, { depth: 0 } ));
                let hrStart = process.hrtime();
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
            }
        } catch(e) {
            message.channel.send(`**ERR!** ${message.author} \`${e.message}\``)
        }

        /*if (args.evalArg === null) {
            message.reply(`Please provide something to evaluate!`);
        } else {

        }*/
    }
};

module.exports = evalCommand;