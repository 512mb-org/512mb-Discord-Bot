const { AkairoClient, CommandHandler } = require('discord-akairo');
const { TOKEN, OWNERS, PREFIX } = require('./config.json');
const ACTIVITIES = ['RAM being destroyed.', 'RAM being crushed'];
const ACTIVITY_TYPES = ['WATCHING', 'LISTENING']

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
            prefix: PREFIX,
            automateCategories: true
        });
        this.commandHandler.loadAll();
    }
}

const client = new FiveOneTwoMBClient();

function randomActivity() {

    setTimeout(function() {
        client.user.setActivity(`${ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)]}`, { type: `${ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)]}` });

        randomActivity();

    }, 30000);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}! Starting to eat ram...`);
    const readyDate = new Date();
    randomActivity();
});

client.login(TOKEN);