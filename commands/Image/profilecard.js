const { Command } = require('discord-akairo');
const { Canvas, resolveImage } = require('canvas-constructor');
const { registerFont } = require('canvas');
const Discord = require('discord.js');
const { path } = require('../../utils');

class profilecardCommand extends Command {
    constructor() {
        super('profilecard', {
            aliases: ['profilecard', 'pc'],
            description: {
                content: 'Generate a profile card for yourself.',
                usage: 'Will be updated soon.',
                examples: 'Will be updated soon.'
            },
            args: [
                {
                    id: 'bday',
                    match: 'option',
                    flag: '-b',
                    type: 'string',
                    default: null
                },
                {
                    id: 'prof',
                    match: 'option',
                    flag: '-p',
                    type: 'string',
                    default: null
                },
                {
                    id: 'loc',
                    match: 'option',
                    flag: '-l',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {

        const flags = {
            DISCORD_EMPLOYEE: await resolveImage(path('/assets/discord_badges/discord_employee.png')),
            DISCORD_PARTNER: await resolveImage(path('/assets/discord_badges/discord_partner.png')),
            BUGHUNTER_LEVEL_1: await resolveImage(path('/assets/discord_badges/bh_l1.png')),
            BUGHUNTER_LEVEL_2: await resolveImage(path('/assets/discord_badges/bh_l2.png')),
            HYPESQUAD_EVENTS: await resolveImage(path('/assets/discord_badges/hs_events.png')),
            HOUSE_BRAVERY: await resolveImage(path('/assets/discord_badges/hs_bravery.png')),
            HOUSE_BRILLIANCE: await resolveImage(path('/assets/discord_badges/hs_brilliance.png')),
            HOUSE_BALANCE: await resolveImage(path('/assets/discord_badges/hs_balance.png')),
            EARLY_SUPPORTER: await resolveImage(path('/assets/discord_badges/e_supporter.png')),
            VERIFIED_DEVELOPER: await resolveImage(path('/assets/discord_badges/e_verified_bot_dev.png'))
        };


        const loader = await message.channel.send(`${this.client.constants.EMOTE_LOADING[0]} ${this.client.constants.LOADING_PHRASES[Math.floor(Math.random() * this.client.constants.LOADING_PHRASES.length)]}`)
        const background = await resolveImage(path('/assets/512mb_profile_card.png'));
        const avatar = await resolveImage(message.author.displayAvatarURL({ dynamic: false, size: 1024, format: 'jpg' }));
        const userFlags = message.author.flags.toArray();
        registerFont(path('/assets/fonts/montserratReg.ttf'), { family: 'montserratReg', weight: '800' });
        registerFont(path('/assets/fonts/montserratBold.ttf'), { family: 'montserratBold', weight: '800' });
        const profileCard = new Canvas(1609, 1018);

        if (args.bday === null) {
            profileCard.printImage(background, 0, 0, 1609, 1018)
            profileCard.printCircularImage(avatar, 255, 260, 185)
            profileCard.setColor('#f1f1f1')
            profileCard.setTextFont('80px montserratBold')
            profileCard.printText(`${message.author.tag}`, 465, 245, 1500)
            profileCard.setTextFont('50px montserratReg')
            profileCard.printText(`${message.author.id}`, 465, 330, 1500);
        } else {
            profileCard.printImage(background, 0, 0, 1609, 1018)
            profileCard.printCircularImage(avatar, 255, 260, 185)
            profileCard.setColor('#f1f1f1')
            profileCard.setTextFont('80px montserratBold')
            profileCard.printText(`${message.author.tag}`, 465, 245, 1500)
            profileCard.setTextFont('50px montserratReg')
            profileCard.printText(`${message.author.id}`, 465, 330, 1500);
            const bdayIcon = await resolveImage(path('/assets/512mb_birthday.png'));
            profileCard.printImage(bdayIcon, 60, 575, 96, 96);
            profileCard.printText(`${args.bday}`, 180, 640, 1500);
        };
        /*
                if (args.prof === null) {
                    return;
                } else {
                    profileCard.printImage();
                    .printText(`${message.author.id}`, 465, 330, 1500)
                };
        
                if (args.loc === null) {
                    return;
                } else {
                    profileCard.printImage();
                    .printText(`${message.author.id}`, 465, 330, 1500)
                };*/
        message.channel.send(new Discord.MessageAttachment(profileCard.toBuffer(), `512mb-profileCard-${message.author.id}.png`));
        loader.delete({ timeout: 1500 });


    }
};
module.exports = profilecardCommand;