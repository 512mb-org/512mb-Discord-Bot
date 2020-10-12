const { AkairoClient, CommandHandler } = require('discord-akairo');
const { TOKEN, OWNERS, PREFIX } = require('./config');

class FiveOneTwoMBClient extends AkairoClient {
    constructor() {
        super({
            // Akairo Client Options here
            ownerID: OWNERS
        }, {
            // Discord.js Options here
            disableMentions: 'everyone'
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: '.',
            automateCategories: true
        });
        this.commandHandler.loadAll();
    }
}

const client = new FiveOneTwoMBClient();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! Starting to eat ram...`);
    const readyDate = new Date();
    client.channels.cache.get("764784634923843605").send(`Hello World! I am \`${client.user.tag}\`. Starting to eat ram now... \nTimestamp: \`${readyDate}\``);
});

client.login(TOKEN);