const { Command } = require('discord-akairo');

class reloadCommand extends Command {
    constructor() {
        super('reload', {
            aliases: ['reload'],
            description: 'Reload\'s the bot\'s commands.'
        });
    }

    async exec(message) {
        message.channel.send(`Restarted!`);
        process.exit();
    }
};

module.exports = reloadCommand;