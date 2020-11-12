const { Command } = require('discord-akairo');
const Canvas = require('canvas');
const Discord = require('discord.js');
const { path } = require('../../utils');

class gayCommand extends Command {
    constructor() {
        super('gay', {
            aliases: ['gay'],
            description: {
                content: 'Generate a gay profile picture.',
                usage: '.gay < OPTIONAL: Member ID / Mention >',
                examples: '.gay 688715868687040582'
            },
            args: [
                {
                    id: 'gayUser',
                    type: 'user',
                    default: message => message.author
                }
            ]
        });
    }

    async exec(message, args) {
        const loader = await message.channel.send(`${this.client.constants.EMOTE_LOADING[0]} ${this.client.constants.LOADING_PHRASES[Math.floor(Math.random() * this.client.constants.LOADING_PHRASES.length)]}`);
        let user = args.gayUser;
        let bg = await Canvas.loadImage(path('/assets/image/gay.png'));
        let img = await Canvas.loadImage(user.displayAvatarURL({ dynamic: false, size: 512, format: 'png' }));
        const canvas = Canvas.createCanvas(480, 480);
        const ctx = canvas.getContext(`2d`);
        ctx.drawImage(img, 0, 0, 480, 480);
        ctx.drawImage(bg, 0, 0, 480, 480);
        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `gay-${message.id}.png`);
        message.channel.send(attachment);
        loader.delete({ timeout: 1500 });
    }
};

module.exports = gayCommand;