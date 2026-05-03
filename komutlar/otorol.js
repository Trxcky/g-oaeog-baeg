module.exports = {
    name: 'zulumrol',
    execute(message, args, client) {
        // Yetki kontrolü
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('Bu komutu kullanmak için **Rolleri Yönet** yetkin olmalı.');
        }

        const secenek = args[0];

        // Sistemi Kapatma
        if (secenek === 'kapat') {
            client.db.delete(`zulumrol_${message.guild.id}`);
            return message.reply('❌ **Durum-Rol sistemi kapatıldı.**');
        }

        // Rol Belirleme
        const rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        if (secenek === 'ayarla' && rol) {
            client.db.set(`zulumrol_${message.guild.id}`, {
                rolID: rol.id,
                yazi: "/zulum" // Durumda aranacak yazı
            });
            return message.reply(`✅ **Durum-Rol sistemi aktif!** \nDurumuna **/zulum** yazanlara <@&${rol.id}> rolü verilecek.`);
        }

        return message.reply('Kullanım: `!zulumrol ayarla @rol` veya `!zulumrol kapat`');
    },
};