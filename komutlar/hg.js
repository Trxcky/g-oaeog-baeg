module.exports = {
    name: 'hg', // !hg olarak çalışır
    execute(message, args, client) {
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ Bu ayarı yapmak için **Yönetici** olmalısın.');
        }

        const kanal = message.mentions.channels.first();
        if (!kanal) {
            return message.reply('⚠️ Lütfen kanalı etiketle! Örn: `!hg #genel`');
        }

        try {
            // index.js'deki "hgkanali_" anahtarıyla tam uyumlu kayıt yapıyoruz
            client.db.set(`hgkanali_${message.guild.id}`, kanal.id);
            message.reply(`✅ Hoş geldin kanalı başarıyla ${kanal} olarak ayarlandı.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ Kanal kaydedilirken bir hata oluştu.');
        }
    },
};