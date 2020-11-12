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
        const msg = await message.channel.send('Ping?');
        msg.edit(`:ping_pong: Pong! ${this.client.ws.ping}ms`)
    }
};

module.exports = pingCommand;