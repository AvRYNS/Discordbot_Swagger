const {
    Client,
    IntentsBitField,
    ButtonBuilder, 
    ButtonStyler, 
    ActionRowBuilder,
    ComponentType, 
    ButtonStyle,
    Collection,
} = require('discord.js');
const runCommand = require('../..');

exports.run = async(client, msg, args, prefix) => {
    
    const firstButton = new ButtonBuilder()
        .setCustomId('first')
        .setLabel('1번')
        .setEmoji("1066243006996426832")
        .setStyle(ButtonStyle.Primary);
    
    const secondButton = new ButtonBuilder()
        .setCustomId('second')
        .setLabel('2번')
        .setEmoji("1066243006996426832")
        .setStyle(ButtonStyle.Secondary);

    const buttonRow = new ActionRowBuilder().addComponents(firstButton, secondButton);

    //reply를 선언하는 이유는 후에 응답을 위해
    const reply = await msg.reply({content : '버튼을 눌러주세요', components: [buttonRow]});

    const filter = (i) => i.user.id === msg.author.id;

    const collector = reply.createMessageComponentCollector({
        ComponentType:ComponentType.Button,
        filter,
    });

    collector.on('collect', (interaction) => {
        if (interaction.customId === 'first'){
            console.log('유로비트를 재생합니다');
            msg.channel.send("스웨그 유로비트")
                .then(msg => {
                    setTimeout(() => msg.delete(), 3000)
                })
        }

        if (interaction.customId === 'second'){
            console.log('유로비트를 재생합니다');
            index.runCommand('중꺾마', msg, args, prefix);
        }
    })
}

exports.config = {
    name: '버튼',
    aliases: ['button', 'qjxms'],
    category: ['bot'],
    des: ['명령어 버튼'],
    use: ['스웨그 버튼']
}