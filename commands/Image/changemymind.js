const { Command } = require('discord-akairo');
const Canvas = require('canvas');
const Discord = require('discord.js');
const { path } = require('../../utils');

class changemymindCommand extends Command {
    constructor() {
        super('changemymind', {
            aliases: ['changemymind', 'cmm'],
            description: {
                content: 'Generate a change my mind meme.',
                usage: '.changemymind < Text >',
                examples: '.changemymind cats are cute.'
            },
            args: [
                {
                    id: 'cmmText',
                    type: 'string',
                    match: 'content',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.cmmText === null) {
            message.channel.send(`**ERR!** ${message.author} Please provide text to generate the meme.`);
        } else {
            const loader = await message.channel.send(`${this.client.constants.EMOTE_LOADING[0]} ${this.client.constants.LOADING_PHRASES[Math.floor(Math.random() * this.client.constants.LOADING_PHRASES.length)]}`)
            const canvas = Canvas.createCanvas(500, 375);
            const ctx = canvas.getContext('2d');
            const background = await Canvas.loadImage(path('/assets/image/cmm.png'));
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            Canvas.registerFont(path('/assets/fonts/montserratReg.ttf'), { family: 'montserratReg', weight: '800' });
            ctx.font = "10pt montserratReg";
            ctx.rotate(-23 * Math.PI / 180);

            function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
                let words = text.split(' ');
                let line = '';

                for (let n = 0; n < words.length; n++) {
                    let testLine = line + words[n] + ' ';
                    let metrics = ctx.measureText(testLine);
                    let testWidth = metrics.width;
                    if (testWidth > maxWidth && n > 0) {
                        ctx.fillText(line, x, y);
                        ctx.restore();
                        line = words[n] + ' ';
                        y += lineHeight;
                    }
                    else {
                        line = testLine;
                    }
                }
                ctx.fillText(line, x, y);
                ctx.restore();
            };

            let maxWidth = 185;
            let lineHeight = 15;
            let x = 105;
            let y = 310;
            let text = args.cmmText;

            wrapText(ctx, text, x, y, maxWidth, lineHeight);

            const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'changemymind.png');
            message.channel.send(attachment);
            loader.delete({ timeout: 1500 });
        };
    }
};

module.exports = changemymindCommand;