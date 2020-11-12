const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const { AkairoClient, CommandHandler } = require('discord-akairo');
const { TOKEN, OWNERS, PREFIX } = require('./config');
const { LOADING_PHRASES } = require('./constants');
const { path } = require('./utils');

class FiveOneTwoMBClient extends AkairoClient {
    constructor() {
        super({
            // Akairo Client Options here
            ownerID: OWNERS
        }, {
            // Discord.js Options here
            disableMentions: 'everyone',
            allowMention: true
        });
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            automateCategories: true,
            prefix: PREFIX
        });
        this.commandHandler.loadAll();
        this.config = require('./config');
        this.constants = require('./constants');
    }
}

const client = new FiveOneTwoMBClient();

function randomActivity() {

    setTimeout(function () {
        client.user.setActivity(`${LOADING_PHRASES[Math.floor(Math.random() * LOADING_PHRASES.length)]}`, { type: `LISTENING` });
        randomActivity();
    }, 90000);
};

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! Starting to eat ram...`);
    randomActivity();
});

client.login(TOKEN);