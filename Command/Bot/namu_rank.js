const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio')
exports.run = async(client, message, args, prefix) => {
    console.log('포인트 실검') ///asdfjasdgl;kjsdg;lkjasdg
    let list = [];
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://search.namu.wiki/api/ranking')
        const content = await page.content();
        const $ = cheerio.load(content)
        const preText = $('pre').text();
        const jsonArray = JSON.parse(preText);
        list = jsonArray.map(item=> item.trim());

        console.log(list);

        
        await page.close();
        await browser.close();
    } catch (err){
        console.error(err);
    }

    const embed = new Discord.EmbedBuilder()   
        .setColor('#AD1457')
        .setTitle('현재 나무위키 실검')
        .setFooter({text: 'swagger 기타 ', iconURL:'https://pbs.twimg.com/media/GN-VJvvboAAwgS_.jpg'})
        .addFields(
            { name: '1', value: list[0], inline: false}, //True면 해당 줄에 이어서
            { name: '2', value: list[1], inline: false},
            { name: '3', value: list[2], inline: false},
            { name: '4', value: list[3], inline: false},
            { name: '5', value: list[4], inline: false},
            { name: '6', value: list[5], inline: false},
            { name: '7', value: list[6], inline: false},
            { name: '8', value: list[7], inline: false},
            { name: '9', value: list[8], inline: false},
            { name: '10', value: list[9], inline: false}
        );
    message.channel.send({ embeds:[embed] });
}

exports.config = {
    name: '실검',
    aliases: ['embed', 'dlaqpem'],
    category: ['bot'],
    des: ['임베드에 대한 설명'],
    use: ['스웨그 실검']
}