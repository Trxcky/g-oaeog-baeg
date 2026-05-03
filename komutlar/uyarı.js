module.exports = {
    name: 'uyar',
    async execute(message, args, client) {
        const islem = args[0]; // ekle, sil, bak
        const guildID = message.guild.id;

        // --- 1. UYARI EKLEME (!uyar @etiket) ---
        if (!islem || (!['sil', 'bak'].includes(islem))) {
            if (!message.member.permissions.has('ModerateMembers')) return message.reply('Yetkin yetersiz!');

            let hedef;
            if (message.reference) {
                const msg = await message.channel.messages.fetch(message.reference.messageId);
                hedef = msg.member;
            } else {
                hedef = message.mentions.members.first();
            }

            if (!hedef) return message.reply('Lütfen birini etiketle, mesajını yanıtla veya `!uyar bak/sil` komutunu kullan!');
            if (hedef.user.bot) return message.reply('Botları uyaramazsın.');

            let uyari = client.db.get(`uyari_${hedef.id}_${guildID}`) || 0;
            uyari++;
            client.db.set(`uyari_${hedef.id}_${guildID}`, uyari);

            if (uyari >= 3) {
                try {
                    await hedef.timeout(24 * 60 * 60 * 1000, '3 Uyarı Sınırı');
                    client.db.set(`uyari_${hedef.id}_${guildID}`, 0);
                    return message.channel.send(`🚨 **${hedef.user.tag}** 3. uyarıya ulaştığı için 1 gün susturuldu!`);
                } catch (e) {
                    return message.reply('Hata: Yetkim timeout atmaya yetmiyor.');
                }
            }
            return message.channel.send(`⚠️ **${hedef.user.tag}** uyarıldı! (Durum: ${uyari}/3)`);
        }

        // --- 2. UYARI BAKMA (!uyar bak @etiket) ---
        if (islem === 'bak') {
            const hedef = message.mentions.members.first() || message.member;
            const uyari = client.db.get(`uyari_${hedef.id}_${guildID}`) || 0;
            return message.reply(`👤 **${hedef.user.username}** kullanıcısının **${uyari}** uyarısı var.`);
        }

        // --- 3. UYARI SİLME (!uyar sil @etiket) ---
        if (islem === 'sil') {
            if (!message.member.permissions.has('ModerateMembers')) return message.reply('Yetkin yetersiz!');
            const hedef = message.mentions.members.first();
            if (!hedef) return message.reply('Uyarılarını sileceğin kişiyi etiketle!');

            client.db.delete(`uyari_${hedef.id}_${guildID}`);
            return message.reply(`✅ **${hedef.user.tag}** kullanıcısının tüm uyarıları sıfırlandı.`);
        }
    },
};