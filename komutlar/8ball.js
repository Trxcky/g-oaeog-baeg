const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: '8ball',
    description: 'Sihirli top sorunu cevaplar.',
    execute(message, args) {
        const soru = args.join(' ');
        if (!soru) return message.reply('Bana bir soru sormalısın');

        const cevaplar = [
            'Kesinlikle evet!', 'Buna güvenebilirsin.', 'Gördüğüm kadarıyla evet.',
            'Pek iyi görünmüyor.', 'Şu an kestiremiyorum.', 'Daha sonra tekrar sor.',
            'Hayır, asla.', 'Kaynağım "hayır" diyor.', 'Çok düşük bir ihtimal.'
        ];

        const cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

        const embed = new EmbedBuilder()
            .setTitle('Sihirli 8-Ball')
            .addFields(
                { name: 'Soru:', value: soru },
                { name: 'Cevap:', value: cevap }
            )
            .setColor('#2f3136');

        message.channel.send({ embeds: [embed] });
    },
};