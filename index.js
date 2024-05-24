require('dotenv').config()

const axios = require('axios');
const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });



client.on('ready', ()=> {
    console.log('bot is ready');
})

client.on('messageCreate', async (message) => {
    if (message.content === '임베딩'){
        const embed = new EmbedBuilder()   
            .setColor('#AD1457')
            .setTitle('title')
            .setDescription('본문에 해당하는 내용이 들어갑니다.')
            .setFooter({text: 'swagger', iconURL:'https://pbs.twimg.com/media/GN-VJvvboAAwgS_.jpg'})
            .setThumbnail('https://pbs.twimg.com/media/GN-VJvvboAAwgS_.jpg')
            .addFields(
                { name: 'Field 1', value: '윤두창', inline: true },
                { name: ' ', value: '=', inline: true },
                { name: 'Field 3', value: '개새끼', inline: false }
            );
        message.channel.send({ embeds:[embed] });
    }
    if (message.content === 'ping'){
        message.reply({
            content: 'pong',
        })
    }
    if (message.content === '우'){
        message.reply({
            content: '흥',
        })
    }

})

client.login(process.env.DISCORD_BOT_ID)