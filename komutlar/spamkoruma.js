module.exports = {
    name: 'spamkoruma',
    execute(message, args, client) {
        // Yetki kontrolü
        if (!message.member.permissions.has('ManageGuild')) {
            return message.reply('Bu sistemi yönetmek için **Sunucuyu Yönet** yetkin olmalı.');
        }

        const secenek = args[0];

        if (secenek === 'aç') {
            client.db.set(`spamkoruma_${message.guild.id}`, true);
            return message.reply('✅ **Spam koruma sistemi aktif edildi!** 3 saniyede 5 mesaj atanların mesajları silinecek ve uyarılacaklar.');
        } 
        
        if (secenek === 'kapat') {
            client.db.delete(`spamkoruma_${message.guild.id}`);
            return message.reply('❌ **Spam koruma sistemi kapatıldı.**');
        }

        return message.reply('Lütfen bir seçenek belirtin: `!spamkoruma aç` veya `!spamkoruma kapat`');
    },
};