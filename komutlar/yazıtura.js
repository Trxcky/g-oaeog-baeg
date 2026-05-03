const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'yazitura',
    description: 'Yazı mı tura mı?',
    execute(message, args) {
        const secenekler = ['yazı', 'tura'];
        const secim = args[0]?.toLowerCase();

        if (!secim || !secenekler.includes(secim)) {
            return message.reply('Lütfen bir seçim yapın: `yazı` veya `tura`');
        }

        const sonuc = secenekler[Math.floor(Math.random() * secenekler.length)];
        const durum = (secim === sonuc) ? 'Kazandın' : 'Kaybettin';

        const embed = new EmbedBuilder()
            .setTitle(' Yazı Tura Sonucu')
            .setDescription(`Senin seçimin: **${secim}**\nParanın sonucu: **${sonuc}**\n\n**${durum}**`)
            .setColor(secim === sonuc ? '#00ff00' : '#ff0000');

        message.channel.send({ embeds: [embed] });
    },
};