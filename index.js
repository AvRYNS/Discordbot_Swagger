require('dotenv').config()

const axios = require('axios');
const { Client, GatewayIntentBits, EmbedBuilder, Collection} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const fs = require('fs')


client.on('ready', ()=> {
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
    } catch (e) {
        console.error(e)
    }





    // if (message.content === '임베딩'){
    //     const embed = new EmbedBuilder()   
    //         .setColor('#AD1457')
    //         .setTitle('title')
    //         .setDescription('본문에 해당하는 내용이 들어갑니다.')
    //         .setFooter({text: 'swagger', iconURL:'https://pbs.twimg.com/media/GN-VJvvboAAwgS_.jpg'})
    //         .setThumbnail('https://pbs.twimg.com/media/GN-VJvvboAAwgS_.jpg')
    //         .addFields(
    //             { name: 'Field 1', value: '윤두창', inline: true }, //True면 해당 줄에 이어서
    //             { name: ' ', value: '=', inline: false }, // False로 된 것부터 다음 줄에서 시작
    //             { name: 'Field 3', value: '개새끼', inline: false }
    //         );
    //     message.channel.send({ embeds:[embed] });
    // }
    // if (message.content === 'ping'){
    //     message.reply({
    //         content: 'pong',
    //     })
    // }
    // if (message.content === '우'){
    //     message.reply({
    //         content: '흥',
    //     })
    // }

})

client.login(process.env.DISCORD_BOT_ID)