// https://discord.com/api/oauth2/authorize?client_id=1003850323896578140&permissions=8&scope=applications.commands%20bot
// https://fantasy.premierleague.com/api/bootstrap-static/

// Require the necessary discord.js classes
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { DISCORD_TOKEN } = process.env;
const dotenv = require('dotenv').config();
const { REST } = require('@discordjs/rest');
const fetch = require('node-fetch');

const prefix = '!';
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;


// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
});

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

// When the client is ready, run this code (only once)
client.on('ready', async () => {
    console.log(`🤖 ${client.user.tag} 🤖 is spun up and ready!`);
    console.log(client.channels);
});


client.on('messageCreate', async (message) => {
    try {
        console.log(message.content);
        if (message.content === 'something came in the mail') {
            message.reply('deez nuts');
            const response = await fetch('https://fantasy.premierleague.com/api/bootstrap-static/');
            const data = await response.json();
            message.reply(JSON.stringify(data.events[0]));
        }
    } catch (error) {
        console.log(error);
    }
    // make sure user isn't the creator of original message so no recursive calls
});

client.on('error', err => {
    console.error(err);
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);