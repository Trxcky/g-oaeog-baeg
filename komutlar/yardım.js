const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    name: 'yardım',
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🛡️ ZULUM GUARD - Yardım Menüsü')
            .setThumbnail(message.client.user.displayAvatarURL())
            .setDescription('Aşağıdaki butonları kullanarak komut kategorilerine göz atabilirsin.\n\n**Kategoriler:**\n🛡️ **Koruma:** Güvenlik ve Otomatik Sistemler\n🔨 **Moderasyon:** Yönetim ve Yetkili Komutları\n🎉 **Eğlence:** Oyunlar ve Yapay Zeka\n🎵 **Müzik & Bilgi:** Ses ve Sunucu İstatistikleri')
            .setFooter({ text: 'Zulum Guard Koruma Sistemi', iconURL: message.author.displayAvatarURL() });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('koruma').setLabel('🛡️ Koruma').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('moderasyon').setLabel('🔨 Moderasyon').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('eglence').setLabel('🎉 Eğlence').setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId('muzik_bilgi').setLabel('🎵 Müzik & Bilgi').setStyle(ButtonStyle.Secondary),
            );

        const response = await message.reply({ embeds: [embed], components: [row] });

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async i => {
            if (i.user.id !== message.author.id) return i.reply({ content: 'Bu menüyü sadece komutu yazan kullanabilir.', ephemeral: true });

            let kategoriEmbed = new EmbedBuilder().setColor('#5865F2').setTimestamp().setFooter({ text: 'Zulum Guard Yardım' });

            if (i.customId === 'koruma') {
                kategoriEmbed.setTitle('🛡️ Koruma ve Otomatik Sistemler')
                    .setDescription('`linkengel`, `spamkoruma`, `zulumrol`, `otorol`, `hgbb-ayar`');
            } else if (i.customId === 'moderasyon') {
                kategoriEmbed.setTitle('🔨 Moderasyon Komutları')
                    .setDescription('`ban`, `unban`, `kick`, `timeout`, `untimeout`, `sil`, `nuke`, `lock`, `unlock`, `rolver`, `uyar`');
            } else if (i.customId === 'eglence') {
                kategoriEmbed.setTitle('🎉 Eğlence ve Oyunlar')
                    .setDescription('`dc`, `gemini`, `yazitura`, `mayintarlasi`, `8ball`, `ship`, `kaçcm`, `sa-as`');
            } else if (i.customId === 'muzik_bilgi') {
                kategoriEmbed.setTitle('🎵 Müzik ve 📊 Bilgi Komutları')
                    .setDescription('**Müzik:** `play`, `skip`, `stop`, `seseçek`, `sesegir` \n**Bilgi:** `sunucu-bilgi`, `yardım`, `afk`');
            }

            await i.update({ embeds: [kategoriEmbed] });
        });

        collector.on('end', () => {
            const disabledRow = new ActionRowBuilder()
                .addComponents(row.components.map(btn => ButtonBuilder.from(btn).setDisabled(true)));
            response.edit({ components: [disabledRow] }).catch(() => {});
        });
    },
};