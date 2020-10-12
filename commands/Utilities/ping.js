const { Command } = require('discord-akairo');

class pingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            description: 'Check this bot\'s heartbeat and message round trip using this command.'
        });
    }

    async exec(message) {
        const sent = await message.reply('Pong!');
        const timeDiff = (sent.editedAt || sent.createdAt) - (message.editedAt || message.createdAt);
        sent.edit([
            `${message.author} Pong! The message round-trip :repeat_one: took ${timeDiff} ms, heartbeat :heartbeat: ping is ${Math.round(this.client.ws.ping)} ms`
        ]);
    }
};

module.exports = pingCommand;