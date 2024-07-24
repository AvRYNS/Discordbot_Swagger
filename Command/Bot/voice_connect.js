const voiceDiscord = require('@discordjs/voice')
const {Message, MessageEmbed} = require('discord.js')
exports.run = async (client, msg, args, prefix) => {
    const channel = msg.member.voice.channel;

    const preVoiceConnection = voiceDiscord.getVoiceConnection(msg.guild.id);
    if(preVoiceConnection){
        preVoiceConnection.destroy()
        console.log('이전 음성 채널의 연결 정보를 제거합니다.')
    }

    try{
        const connection = voiceDiscord.joinVoiceChannel({
        channelId: channel.id,
        guildId: msg.guild.id,
        adapterCreator: msg.guild.voiceAdapterCreator,
        })
        console.log('음성 채널 ${channel.name}에 연결하였습니다.');
    }catch(error){
        console.error('음성 채널에 연결할 수 없습니다.');
        msg.reply('먼저 음성 채널에 접속해주세요.');
    }


}

exports.config = {
    name: '조인',
    aliases: ['connect', 'whdls'],
    category: ['bot'],
    des: ['명령어'],
    use: ['스웨그 조인']
}