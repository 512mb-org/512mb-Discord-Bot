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
        // const msg = await message.channel.send('Ping?');
        // msg.edit(`:ping_pong: Pong! ${this.client.ws.ping}ms`)
        
        const sent = await message.reply('Pong!');
        const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
        sent.edit([
            `${message.author} Pong! The message round-trip :repeat_one: took ${timeDiff} ms, heartbeat :heartbeat: ping is ${Math.round(this.client.ws.ping)} ms`
        ]);
    }
};

module.exports = pingCommand;
