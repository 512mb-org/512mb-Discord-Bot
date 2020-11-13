const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const centra = require('@aero/centra');

class twoBeeCommand extends Command {
    constructor() {
        super('2b2t', {
            aliases: ['2b2t'],
            description: {
                content: 'Display\'s 2b2t\'s current status.',
                usage: '.2b2t',
                examples: '.2b2t'
            }
        });
    }

    async exec(message) {
        const prioQ = await centra(`https://api.2b2t.dev/prioq`).json();
        const standardQ = await centra(`https://2b2t.io/api/queue?last=true`).json();
        const serverStatus = await centra(`https://api.2b2t.dev/status`).json();

        const twoBeeEmbed = new MessageEmbed()
            .setColor(this.client.constants.EMBED_COLOR)
            .setThumbnail('https://cdn.bongo.ninja/sharex/2b2t.png');
        if (serverStatus[3] === 0) {
            twoBeeEmbed.setTitle(`2b2t Server Stats : Offline`);
            let TwoBee = [
                { name: 'Priority Queue', value: prioQ[1] },
                { name: 'Standard Queue', value: standardQ[1] },
                { name: 'TPS', value: `${this.client.constants.EMOTE_OFFLINE[0]} Offline` },
                { name: 'Uptime', value: `${this.client.constants.EMOTE_OFFLINE[0]} Offline` }
            ];
            twoBeeEmbed.addFields(TwoBee);

        } else {
            twoBeeEmbed.setTitle(`2b2t Server Stats : Online`);
            let TwoBee = [
                { name: 'Priority Queue', value: prioQ[1] },
                { name: 'Standard Queue', value: standardQ[0][1] },
                { name: 'TPS', value: serverStatus[0][0] },
                { name: 'Uptime', value: serverStatus[0][3] }
            ];
            twoBeeEmbed.addFields(TwoBee);
        }

        return message.channel.send(twoBeeEmbed);
    }
};

module.exports = twoBeeCommand;