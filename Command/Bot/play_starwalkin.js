const voice = require('@discordjs/voice');
const discord = require('discord.js')
const {Client, GatewayIntentBits} = require('discord.js')
const fs = require('fs');
const path = require('path');

exports.run = async (client, msg, args, prefix) => {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
        return msg.reply('먼저 음성 채널에 접속해주세요.');
    }

    // Check for existing voice connection and destroy it if present
    const preVoiceConnection = voice.getVoiceConnection(msg.guild.id);
    if (preVoiceConnection) {
        preVoiceConnection.destroy();
        console.log('이전 음성 채널의 연결 정보를 제거합니다.');
    }

    try {
        // Join the voice channel
        const connection = voice.joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: msg.guild.id,
            adapterCreator: msg.guild.voiceAdapterCreator,
        });
        console.log(`음성 채널 ${voiceChannel.name}에 연결하였습니다.`);
        // Play a random Eurobeat song
        playRandomEurobeat(connection, msg);
    } catch (error) {
        console.error('음성 채널에 연결할 수 없습니다:', error);
        msg.reply('음성 채널에 연결할 수 없습니다.');
    }



};

exports.config = {
    name: '중꺾마',
    aliases: ['star walkin', 'wndRJRak'],
    category: ['music'],
    des: ['랜덤 중꺾마 노래를 재생합니다.'],
    use: ['스웨그 중꺾마']
};

// Function to play a random Eurobeat song
function playRandomEurobeat(connection, message) {
    // Move one directory up and access the Eurobeat folder
    const eurobeatPath = path.join(__dirname, '../../music/DEFT');
    const files = fs.readdirSync(eurobeatPath).filter(file => file.endsWith('.mp3'));

    if (files.length === 0) {
        message.reply('DEFT 디렉토리에 재생할 파일이 없습니다.');
        connection.destroy();
        return;
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const resource = voice.createAudioResource(path.join(eurobeatPath, randomFile), {inlineVolume: true});
    resource.volume.setVolume(0.1)
    const player = voice.createAudioPlayer();

    //play
    player.on(voice.AudioPlayerStatus.Playing, () => {
        console.log(`Playing: ${randomFile}`);
    //    message.reply(`Now playing: **${randomFile}**`);
    });

    player.on(voice.AudioPlayerStatus.Idle, () => {
        console.log('Song finished playing.');
        connection.destroy();
        message.channel.send('재생이 종료되었습니다.');
    });

    player.on('error', error => {
        console.error('Error playing song:', error.message);
        message.reply('노래를 재생하는 동안 오류가 발생했습니다.');
    });

    connection.subscribe(player);


    player.play(resource);
}

// module.exports = {playRandomEurobeat};
// have to add the pause, stop with module exports