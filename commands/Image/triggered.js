const { Command } = require('discord-akairo');
const Canvas = require('canvas');
const Discord = require('discord.js');
const { path } = require('../../utils');
const GIFEncoder = require('gifencoder');

class triggeredCommand extends Command {
    constructor() {
        super('triggered', {
            aliases: ['triggered', 'trigger'],
            description: {
                content: 'Generate a triggered gif.',
                usage: '.triggered < OPTIONAL: Member ID / Mention >',
                examples: '.triggered 688715868687040582'
            },
            args: [
                {
                    id: 'triggeredUser',
                    type: 'user',
                    default: message => message.author
                }
            ]
        });
    }

    async exec(message, args) {
        const loader = await message.channel.send(`${this.client.constants.EMOTE_LOADING[0]} ${this.client.constants.LOADING_PHRASES[Math.floor(Math.random() * this.client.constants.LOADING_PHRASES.length)]}`);
        let user = args.triggeredUser;

        const base = await Canvas.loadImage(path('assets/image/triggered.png'));
        const img = await Canvas.loadImage(user.displayAvatarURL({ dynamic: false, size: 512, format: 'png' }));
        const GIF = new GIFEncoder(256, 310);
        GIF.start();
        GIF.setRepeat(0);
        GIF.setDelay(15);
        const canvas = Canvas.createCanvas(256, 310);
        const ctx = canvas.getContext(`2d`);
        const BR = 20;
        const LR = 10;
        for (var i = 0; i < 9; i++) {
            ctx.clearRect(0, 0, 256, 310);
            ctx.drawImage(img, Math.floor(Math.random() * BR) - BR, Math.floor(Math.random() * BR) - BR, 256 + BR, 310 - 54 + BR);
            ctx.fillStyle = `#FF000033`;
            ctx.fillRect(0, 0, 256, 310);
            ctx.drawImage(base, Math.floor(Math.random() * LR) - LR, 310 - 54 + Math.floor(Math.random() * LR) - LR, 256 + LR, 54 + LR);
            GIF.addFrame(ctx);
        }
        GIF.finish();
        const attachment = new Discord.MessageAttachment(GIF.out.getData(), `triggered-${message.id}.gif`);
        message.channel.send(attachment);
        loader.delete({ timeout: 1500 });
    }
};

module.exports = triggeredCommand;