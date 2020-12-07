const { Command } = require('discord-akairo');

class pingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: {
                content: 'Display\'s the bot\'s ping/latency.',
                usage: '.ping',
                examples: '.ping'
            }
        });
    }

    async exec(message) {
        // Simple Ping
        // const msg = await message.channel.send('Ping?');
        // msg.edit(`:ping_pong: Pong! ${this.client.ws.ping}ms`)
        
        // Akairo Sample Ping
        // const sent = await message.reply('Pong!');
        // const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
        // sent.edit([
        //     `${message.author} Pong! The message round-trip :repeat_one: took ${timeDiff} ms, heartbeat :heartbeat: ping is ${Math.round(this.client.ws.ping)} ms`
        // ]);
        
        // Aero Bot Ping
        const msg = await message.channel.send('ping?');
        const wsPing = Math.round(this.client.ws.ping);
        const cfPing = parseInt(await req(`https://ping.aero.bot`).text());
        const roundTrip = (msg.editedTimestamp || msg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp);
        const discordLatency = roundTrip - wsPing > 0 ? roundTrip - wsPing - cfPing : roundTrip - cfPing;
        const wsLatency = wsPing - cfPing;
        const netLatency = cfPing;
        const totalLatency = discordLatency + wsLatency + netLatency;
        return msg.edit(`Pong! Took ${totalLatency}ms. (Discord latency: ${discordLatency}ms. Connection latency: ${wsLatency}ms. Network latency: ${netLatency}ms.)`);
    }
};

module.exports = pingCommand;
