const Discord = require('discord.js');
const client = new Discord.Client();
const keepUp = require("./server");

const prefix = '!';
const fs = require('fs');

// Find & checks for commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log(`Bot ( ${client.user.tag} ) is Online.`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'fuck-you') {
        client.commands.get('fuck-you').execute(message, args);
    }
    else if (command === 'set-role') {
        client.commands.get('set-role').execute(message, args);
    }
    else if (command === 'rm-role') {
        client.commands.get('rm-role').execute(message, args);
    }
    else if (command === 'test') {
        client.commands.get('test').execute(message, args);
    }
});

keepUp();

const myDiscordToken = process.env['DISCORD-TOKEN']
client.login(myDiscordToken);