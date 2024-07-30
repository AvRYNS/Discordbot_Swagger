exports.run = async (client, msg, args, prefix) => {
    const message = "```스웨그 ? : 명령어를 출력합니다.\n"
    + "스웨그 실검 : 현재 나무위키 실시간 검색어 순위를 출력합니다.\n"
    + "스웨그 임베드 : ㅇ\n"
    + "스웨그 핑 : 현재 서버와의 핑을 표시합니다.\n"
    +"스웨그 조인 : 현재 보이스 채널에 연결합니다.\n"
    +"스웨그 퇴장 : 현재 참가한 보이스 채널에서 퇴장합니다.\n"
    +"스웨그 GPT : 스웨그용 GPT4 챗봇(무료로 GPT4를 사용해보세요)\n"
    + "```";
    msg.channel.send(message)
}
//did nothing
exports.config = {
    name: '?',
    aliases: ['?', 'help'],
    category: ['bot'],
    des: ['명령어'],
    use: ['스웨그 ?']
}