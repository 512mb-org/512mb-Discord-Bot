const { Command } = require('discord-akairo');
const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

class covidCommand extends Command {
    constructor() {
        super('covid', {
            aliases: ['covid', 'ncov', 'corona'],
            description: {
                content: 'Check a country\'s covid status.',
                usage: '.covid < Country (Alpha 2 code Recommended) >',
                examples: '.covid ch'
            },
            args: [
                {
                    id: 'covidArg',
                    type: 'string',
                    match: 'content',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.covidArg === null) {
            return message.channel.send(`**ERR!** ${message.author} please provide a country to check covid stats for.`);
        } else {
            try {
                const response = await fetch(`https://disease.sh/v3/covid-19/countries/${args.covidArg}`);
                const json = await response.json();
                if (json.message === "Country not found or doesn't have any cases") {
                    return message.channel.send(`**ERR!** ${message.author} \`Country not found or doesn't have any cases\``);
                } else {
                    const covidEmbed = new MessageEmbed()
                        .setTitle(`Covid stats for ${json.country}`)
                        .setThumbnail(`${json.countryInfo.flag}`)
                        .setColor(this.client.constants.EMBED_COLOR)
                        .addField(`${this.client.constants.EMOTE_COVID_CASES[0]} Cases`, `**${json.cases.toLocaleString()}** \nCritical: ${json.critical.toLocaleString()} \nToday: ${json.todayCases.toLocaleString()}`)
                        .addField(`${this.client.constants.EMOTE_COVID_DEATHS[0]} Deaths`, `**${json.deaths.toLocaleString()}** \nToday: ${json.todayDeaths.toLocaleString()}`)
                        .addField(`${this.client.constants.EMOTE_COVID_RECOVERIES[0]} Recoveries`, `**${json.recovered.toLocaleString()}** \nToday: ${json.todayRecovered.toLocaleString()}`)
                        .addField(`${this.client.constants.EMOTE_COVID_TESTS[0]} Tests`, `**${json.tests.toLocaleString()}** \nTests Per One Million: ${json.testsPerOneMillion.toLocaleString()}`)
                        .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
                    return message.channel.send(covidEmbed);
                }
            } catch (err) {
                return message.channel.send(`**ERR!** ${message.author} \`${err}\``);
            }
        }
    }
};

module.exports = covidCommand;