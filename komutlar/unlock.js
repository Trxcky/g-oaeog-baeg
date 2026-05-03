module.exports = {
    name: 'unlock',
    async execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has('ManageChannels')) {
            return message.reply('Bu komutu kullanmak için **Kanalları Yönet** yetkin olmalı.');
        }

        try {
            // @everyone rolünün mesaj atma yetkisini açar (veya nötrler)
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
                SendMessages: null
            });

            message.reply('🔓 Kanal kilidi açıldı. Mesaj gönderimi aktif.');
        } catch (error) {
            console.error(error);
            message.reply('Kanal açılırken bir hata oluştu!');
        }
    },
};