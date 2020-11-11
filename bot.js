// const sqlite = require('sqlite');
const { AkairoClient, CommandHandler, SQLiteProvider } = require('discord-akairo');
const { TOKEN, OWNERS, PREFIX } = require('./config');
const { LOADING_PHRASES } = require('./constants');
// const { path } = require('./utils');

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
        /*this.settings = new SQLiteProvider(sqlite.open(path('db/FiveOneTwoMB.sqlite')), 'FiveOneTwoMB', {
            idColumn: 'guild_id',
            dataColumn: 'settings'
        });*/
        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            automateCategories: true,
            /*prefix: message => {
                if (message.guild) {
                    // The third arg is the default.
                    return this.settings.get(message.guild.id, 'prefix', PREFIX);
                }
                return PREFIX;
            }*/
            prefix: PREFIX
        });
        this.commandHandler.loadAll();
        this.config = require('./config');
        this.constants = require('./constants');
    }
    /*async login(token) {
        await this.settings.init();
        return super.login(token);
    }*/
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
    client.user.setPresence({ status: 'idle' });
    randomActivity();
});



client.login(TOKEN);

// if only the fucking sqlite db shit worked i'll remove the useless comments >:C