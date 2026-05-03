module.exports = {
    name: 'lock',
    async execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has('ManageChannels')) {
            return message.reply('Bu komutu kullanmak için **Kanalları Yönet** yetkin olmalı.');
        }

        try {
            // @everyone rolünün mesaj atma yetkisini kapatır
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: false
            });

            message.reply('🔒 Kanal başarıyla kilitlendi. Artık kimse mesaj atamaz.');
        } catch (error) {
            console.error(error);
            message.reply('Kanal kilitlenirken bir hata oluştu!');
        }
    },
};