const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'sunucu-bilgi',
    description: 'Sunucu hakkında detaylı bilgi verir.',
    execute(message) {
        const { guild } = message;

        // Üye sayılarını kategorize edelim
        const toplamUye = guild.memberCount;
        const botSayisi = guild.members.cache.filter(member => member.user.bot).size;
        const insanSayisi = toplamUye - botSayisi;
        const kanalSayisi = guild.channels.cache.size;
        const rolSayisi = guild.roles.cache.size;
        const takviyeSayisi = guild.premiumSubscriptionCount || 0;

        const embed = new EmbedBuilder()
            .setTitle(` ${guild.name} Sunucu Bilgileri`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setColor('#5865F2')
            .addFields(
                { name: ' Sunucu ID', value: guild.id, inline: true },
                { name: ' Sunucu Sahibi', value: `<@${guild.ownerId}>`, inline: true },
                { name: ' Kuruluş Tarihi', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
                { name: ' Üyeler', value: `Toplam: **${toplamUye}**\nİnsan: **${insanSayisi}**\nBot: **${botSayisi}**`, inline: true },
                { name: ' Kanallar', value: `Toplam: **${kanalSayisi}**`, inline: true },
                { name: ' Roller', value: `Toplam: **${rolSayisi}**`, inline: true },
                { name: ' Takviye (Boost)', value: `Seviye: **${guild.premiumTier}**\nSayı: **${takviyeSayisi}**`, inline: true }
            )
            .setFooter({ text: `${message.author.tag} tarafından istendi.`, iconURL: message.author.displayAvatarURL() })
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};