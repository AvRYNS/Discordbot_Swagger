const Discord = require('discord.js')
exports.run = async(client, message, args, prefix) => {
    let obj = args.shift()
    console.log(obj)
    const embed = new Discord.EmbedBuilder()   
        .setColor('#AD1457')
        .setTitle('title')
        .setDescription(obj)
        .setFooter({text: 'swagger', iconURL:'https://pbs.twimg.com/media/GN-VJvvboAAwgS_.jpg'})
        .setThumbnail('https://pbs.twimg.com/media/GN-VJvvboAAwgS_.jpg')
        .addFields(
            { name: 'Field 1', value: 'Fuck', inline: true }, //True면 해당 줄에 이어서
            { name: ' ', value: '♂', inline: false }, // False로 된 것부터 다음 줄에서 시작
            { name: 'Field 3', value: 'you', inline: false }
        );
    message.channel.send({ embeds:[embed] });
}

exports.config = {
    name: '임베드',
    aliases: ['embed', 'dlaqpem'],
    category: ['bot'],
    des: ['임베드에 대한 설명'],
    use: ['스웨그 임베드']
}