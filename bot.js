const { AkairoClient, CommandHandler, MongooseProvider } = require('discord-akairo');
const { TOKEN, OWNERS, PREFIX } = require('./config');
const { LOADING_PHRASES } = require('./constants');
const model = require('./model');

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
            prefix: (message) => {
                if (message.guild) {
                    return this.settings.get(message.guild.id, 'prefix', PREFIX);
                }

                return PREFIX;
            }
        });
        this.commandHandler.loadAll();
        this.config = require('./config');
        this.constants = require('./constants');
        this.settings = new MongooseProvider(model);
    }
    async login(token) {
        await this.settings.init();
        return super.login(token);
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