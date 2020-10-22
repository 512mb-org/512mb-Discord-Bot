const { Command } = require('discord-akairo');

class stealCommand extends Command {
    constructor() {
        super('steal', {
            aliases: ['steal', 'yoink'],
            description: 'Add an emote using a link or from an external emote.',
            clientPermissions: 'MANAGE_EMOJIS',
            userPermissions: 'MANAGE_EMOJIS',
            args: [
                {
                    id: 'stealEmote',
                    type: 'string',
                    default: null
                },
                {
                    id: 'stealEmoteName',
                    type: 'string',
                    default: null
                }
            ]
        });
    }

    async exec(message, args) {
        if (args.stealEmote === null) {
            return message.channel.send(`**ERR!** ${message.author} Please provide an emote to upload!`);
        } else if (args.stealEmote.startsWith('https://')) {
            if (args.stealEmoteName === null) {
                return message.channel.send(`**ERR!** ${message.author} Please provide a name for the emote!`);
            } else {
                try {
                    message.guild.emojis.create(args.stealEmote, args.stealEmoteName)
                        .then((emote)=>{message.channel.send(`Added <:${args.stealEmoteName}:${emote.id}> with the name as \`${args.stealEmoteName}\`!`)})
                        .catch((err)=>{message.channel.send(`**ERR!** ${message.author} \`${err}\``)});
                } catch (err) {
                    return message.channel.send(`**ERR!** ${message.author} \`${err}\`!`);
                }
                
            }
        } else if (args.stealEmote.match(/^(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)+$/)){
            const emoteID = args.stealEmote.split(':')[2].slice(0, -1);
            const emoteName = args.stealEmote.split(':')[1];
            const emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}.png`;
            message.guild.emojis.create(emoteURL, emoteName)
                .then((emote)=>{message.channel.send(`Added <:${emoteName}:${emote.id}> with the name as \`${emoteName}\`!`)})
                .catch((err)=>{message.channel.send(`**ERR!** ${message.author} \`${err}\``)});
        }
    }
};

module.exports = stealCommand;