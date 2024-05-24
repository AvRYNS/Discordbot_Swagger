exports.run = async (client, msg, args, prefix) => {
    msg.channel.send(`"스웨그 ?" : 명령어를 출력합니다.`)
    msg.channel.send(`"스웨그 실검" : 현재 나무위키 실시간 검색어 순위를 출력합니다.`)
    msg.channel.send(`"스웨그 임베드" : ㅇ`)
    msg.channel.send(`"스웨그 핑" : 스웨거 봇의 핑(지연시간ms)을 출력합니다.`)
}

exports.config = {
    name: '?',
    aliases: ['vld', 'botping'],
    category: ['bot'],
    des: ['명령어'],
    use: ['스웨그 ?']
}