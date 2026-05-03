module.exports = {
    name: 'linkengel',
    execute(message, args, client) {
        // Yetki kontrolü
        if (!message.member.permissions.has('ManageGuild')) {
            return message.reply('Bu sistemi yönetmek için **Sunucuyu Yönet** yetkin olmalı.');
        }

        const secenek = args[0];

        if (secenek === 'aç') {
            client.db.set(`linkengel_${message.guild.id}`, true);
            return message.reply('✅ **Link engelleme sistemi bu sunucuda aktif edildi!** Artık reklam linkleri silinecek.');
        } 
        
        if (secenek === 'kapat') {
            client.db.delete(`linkengel_${message.guild.id}`);
            return message.reply('❌ **Link engelleme sistemi kapatıldı.**');
        }

        return message.reply('Lütfen bir seçenek belirtin: `!linkengel aç` veya `!linkengel kapat`');
    },
};