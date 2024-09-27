const voiceDiscord = require('@discordjs/voice');
const {Message, MessageEmbed} = require('discord.js')
exports.run = async (command, msg, args, prefix) => {
    const channel = msg.member.voice.channel;

    if (!channel) {
        return msg.reply('먼저 음성 채널에 접속해주세요.');
    }

    const connection = voiceDiscord.getVoiceConnection(msg.guild.id);
    
    try{
        if (connection) {
            connection.destroy();
            console.log('음성 채널에서 퇴장합니다.');
        } else {
            console.log('봇이 현재 음성 채널에 접속해 있지 않습니다.');
        }
    }catch(error){
        console.error('음성 채널 퇴장에서 문제가 발생하였습니다.')
    }
}

exports.config = {
    name: '퇴장',
    aliases: ['quit', 'xhlwkd', 'skrk'],
    category: ['bot'],
    des: ['음성 채널에서 봇을 퇴장시킵니다.'],
    use: ['스웨그 퇴장']
}