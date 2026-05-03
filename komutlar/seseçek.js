module.exports = {
    name: 'seseçek',
    async execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has('MoveMembers')) {
            return message.reply('Bu komutu kullanmak için **Üyeleri Taşı** yetkin olmalı.');
        }

        // Çekilecek kullanıcıyı bul
        const target = message.mentions.members.first();
        if (!target) return message.reply('Lütfen sese çekmek istediğin kişiyi etiketle!');

        // Ses kanalı kontrolleri
        const botChannel = message.member.voice.channel;
        if (!botChannel) return message.reply('Önce senin bir ses kanalına girmen gerekiyor!');
        
        if (!target.voice.channel) return message.reply('Etiketlediğin kişi şu an herhangi bir ses kanalında değil!');

        if (target.voice.channel.id === botChannel.id) {
            return message.reply('Zaten aynı ses kanalındasınız!');
        }

        try {
            // Kullanıcıyı çek
            await target.voice.setChannel(botChannel);
            message.reply(`✅ ${target} başarıyla **${botChannel.name}** kanalına çekildi.`);
        } catch (error) {
            console.error(error);
            message.reply('Kullanıcıyı sese çekerken bir hata oluştu! (Botun yetkisi yetmiyor olabilir)');
        }
    },
};