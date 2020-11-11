const { Command } = require('discord-akairo');
const { Canvas, resolveImage } = require('canvas-constructor');
const { registerFont } = require('canvas');
const Discord = require('discord.js');
const { path } = require('../../utils');

class drakeCommand extends Command {
    constructor() {
        super('drake', {
            aliases: ['drake'],
            description: {
                content: 'Generate a drake meme.',
                usage: '.drake -t < TYPE: img / txt > "Text A or Image A goes here." "Text B or Image B goes here."',
                examples: '.drake -t img "https://fontmeme.com/images/Python-Logo.jpg" "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"` \n\n`.drake -t txt "Aero Bot" "512mb Bot"'
            },
            args: [
                {
                    id: 'opt',
                    type: 'string',
                    match: 'option',
                    flag: '-t',
                    default: null
                },
                {
                    id: 'boxA',
                    type: 'string',
                    default: null
                },
                {
                    id: 'boxB',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.opt === null) {
            message.channel.send(`**ERR!** ${message.author} Please provide text or images to generate the meme.`);
        } else {
            const drakeMeme = new Canvas(1200, 1200);
            const base = await resolveImage(path('/assets/image/drake.png'));
            drakeMeme.printImage(base, 0, 0, 1200, 1200);
            registerFont(path('assets/fonts/firacodeReg.ttf'), { family: 'firacodeReg', weight: '800' });
            if (args.opt === 'img') {
                try {
                    const loader = await message.channel.send(`${this.client.constants.EMOTE_LOADING[0]} ${this.client.constants.LOADING_PHRASES[Math.floor(Math.random() * this.client.constants.LOADING_PHRASES.length)]}`)
                    const imgA = await resolveImage(`${args.boxA}`);
                    const imgB = await resolveImage(`${args.boxB}`);
                    drakeMeme.printImage(imgA, 610, 70, 580, 500);
                    drakeMeme.printImage(imgB, 610, 670, 580, 500);
                    message.channel.send(new Discord.MessageAttachment(drakeMeme.toBuffer(), `drake-${message.id}.png`));
                    loader.delete({ timeout: 1500 });
                } catch (err) {
                    message.channel.send(`**ERR!** ${message.author} ${err}`)
                }

            } else if (args.opt === 'txt') {
                try {
                    const loader = await message.channel.send(`${this.client.constants.EMOTE_LOADING[0]} ${this.client.constants.LOADING_PHRASES[Math.floor(Math.random() * this.client.constants.LOADING_PHRASES.length)]}`)
                    const textA = args.boxA;
                    const textB = args.boxB;
                    drakeMeme.setTextFont('50px firacodeReg');
                    drakeMeme.printWrappedText(textA, 610, 70, 570);
                    drakeMeme.printWrappedText(textB, 610, 670, 570);
                    message.channel.send(new Discord.MessageAttachment(drakeMeme.toBuffer(), `drake-${message.id}.png`));
                    loader.delete({ timeout: 1500 });
                } catch (err) {
                    message.channel.send(`**ERR!** ${message.author} ${err}`)
                }
            } else {
                return message.channel.send(`**ERR!** ${message.author} Invalid option!`);
            }
        };
    }
};

module.exports = drakeCommand;