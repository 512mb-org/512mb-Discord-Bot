const { Command } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const httpCats = ['100', '101', '102', '200', '201', '202', '204', '206', '207', '300', '301', '302', '303', '304', '305', '307', '400', '400', '401', '402', '403', '404', '405', '406', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '420', '421', '422', '423', '424', '425', '426', '429', '431', '444', '450', '451', '499', '500', '501', '502', '503', '504', '506', '507', '508', '509', '510', '511', '599'];

class httpcatCommand extends Command {
    constructor() {
        super('httpcat', {
            aliases: ['httpcat', 'http', 'hc'],
            description: {
                content: 'HTTP Cats.',
                usage: '.httpcat < HTTP Error Code >',
                examples: '.httpcat 404'
            },
            args: [
                {
                    id: 'httpErrorCode',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.httpErrorCode === null) {
            message.channel.send(`**ERR!** ${message.author} Please specify the HTTP Error Code for the HTTP Cat you want! \nList of HTTP Error Codes: \n\`${httpCats.join('`, `')}\``);
        } else if (httpCats.includes(args.httpErrorCode)) {
            // message.channel.send(`https://http.cat/${args.httpErrorCode}.jpg`)
            const attachment = new MessageAttachment(`https://http.cat/${args.httpErrorCode}.jpg`, `${args.httpErrorCode}.jpg`);
            message.channel.send(attachment);
        } else {
            message.channel.send(`**ERR!** ${message.author} Invalid HTTP Error Code! \nList of HTTP Error Codes: \n\`${httpCats.join('`, `')}\``)
        }
    }
};

module.exports = httpcatCommand;