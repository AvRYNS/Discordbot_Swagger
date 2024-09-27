require('dotenv').config()

const axios = require('axios');
const { Client, GatewayIntentBits, EmbedBuilder, Collection, IntentsBitField, VoiceState} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates] });
const fs = require('fs')


client.on('ready', ()=> {
    const packageJSON = require("./package.json");
    const discordjsVersion =  packageJSON.dependencies["discord.js"];
    console.log('Current DiscordJS version : '+discordjsVersion);
    console.log('bot is ready');
    
})
client.aliases = new Collection()
client.commands = new Collection()

fs.readdirSync("./Command/").forEach(dir => {
    const Filter = fs.readdirSync(`./Command/${dir}`).filter(f => f.endsWith(".js"));
    Filter.forEach(file => {
        const cmd = require(`./Command/${dir}/${file}`);
        client.commands.set(cmd.config.name, cmd)
        for (let alias of cmd.config.aliases) {
            client.aliases.set(alias, cmd.config.name)
        }
    })
})

function runCommand(command, message, args, prefix) { // 명령어 실행
    if (client.commands.get(command) || client.aliases.get(command)) { 
        const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command)) 
        if (cmd) cmd.run(client, message, args, prefix); return 
    }
}

client.on('messageCreate', async (message) => {
    const prefix = '스웨그'
    if (!message.content.startsWith(prefix)) return
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase()
    try { 
        runCommand(command, message, args, prefix)
        // console.log(`command : ${command}`)
        // console.log(`messages : ${message}`)
        // console.log(`args : ${args}`)
        // console.log(`prefix : ${prefix}`)
    } catch (e) {
        console.error(e)
    }
})

client.login(process.env.DISCORD_BOT_ID)

module.exports = runCommand;
//node index.js