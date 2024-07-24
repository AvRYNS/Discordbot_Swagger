exports.run = async (client, msg, args, prefix) => {
    const message = "스웨그GPT에 참여해보세요!\nhttps://chatgpt.com/g/g-RkEL2Ww0P-swagger";
    msg.channel.send(message)
}

exports.config = {
    name: 'GPT',
    aliases: ['gpt', 'wlvlxl'],
    category: ['bot'],
    des: ['스웨그를 기반으로 만들어진 다용도 GPT'],
    use: ['스웨그 gpt']
}