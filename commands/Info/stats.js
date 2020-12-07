const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
let os = require('os');
let cpuStat = require('cpu-stat');
const prettyBytes = require('pretty-bytes');

class statsCommand extends Command {
  constructor() {
    super('stats', {
      aliases: ['stats'],
      description: {
        content: 'Check this bot\'s stats.',
        usage: '.stats',
        examples: '.stats'
      }
    });
  }

  async exec(message) {
    cpuStat.usagePercent((error, percent) => {
      if (error) {
        return console.error(error)
      }
      const cores = os.cpus().length;
      const cpuModel = os.cpus()[0].model;
      const guild = this.client.guilds.cache.size.toLocaleString();
      const user = this.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0); message.channel.send(userCount);
      const channel = this.client.channels.cache.size.toLocaleString();
      const usage = prettyBytes(process.memoryUsage().heapUsed);
      const Node = process.version;
      const CPU = percent.toFixed(2);
      const statsEmbed = new MessageEmbed()
        .setTitle('512mb Bot Stats')
        .setFooter(`Requested by ${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL())
        .setColor(this.client.constants.EMBED_COLOR)

      statsEmbed.addField('Bot Statistics:', `**❯ Server:** ${guild} \n**❯ User:** ${user} \n**❯ Channel:** ${channel} \n**❯ Memory Usage:** ${usage} \n**❯ Node.js version:** ${Node} \n**❯ CPU Usage:** ${CPU}%`);
      statsEmbed.addField('Physical Statistics:', `**❯ CPU:** ${cores} - ${cpuModel} \n**❯ Uptime:** ${parseDur(this.client.uptime)}`);

      function parseDur(ms) {
        let seconds = ms / 1000,
          days = parseInt(seconds / 86400);
        seconds = seconds % 86400

        let hours = parseInt(seconds / 3600);
        seconds = seconds % 3600

        let minutes = parseInt(seconds / 60);
        seconds = parseInt(seconds % 60)

        if (days) {
          return `${days} day, ${hours} hours, ${minutes} minutes`
        } else if (hours) {
          return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
        } else if (minutes) {
          return `${minutes} minutes, ${seconds} seconds`
        }

        return `${seconds} second(s)`
      }

      message.channel.send(statsEmbed);

    })
  }
};

module.exports = statsCommand;
