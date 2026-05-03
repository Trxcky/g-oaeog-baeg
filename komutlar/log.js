module.exports = {
    name: 'log',
    execute(message, args, client) {
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ Bu ayarı yapmak için **Yönetici** olmalısın.');
        }

        const kanal = message.mentions.channels.first();
        if (!kanal) {
            return message.reply('⚠️ Lütfen log kanalını etiketle! Örn: `!log #mod-log`');
        }

        try {
            client.db.set(`logkanali_${message.guild.id}`, kanal.id);
            message.reply(`✅ Log kanalı başarıyla ${kanal} olarak ayarlandı.`);
        } catch (error) {
            console.error(error);
            message.reply('❌ Kanal kaydedilirken bir hata oluştu.');
        }
    },
};