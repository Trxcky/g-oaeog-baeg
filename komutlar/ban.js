module.exports = {
    name: 'ban',
    async execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('Bu komutu kullanmak için **Üyeleri Yasakla** yetkin olmalı.');
        }

        let targetMember;
        let sebep = args.slice(1).join(' ') || 'Sebep belirtilmedi';

        // 1. Durum: Mesaj yanıtlama (Reply) kontrolü
        if (message.reference) {
            const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
            targetMember = repliedMessage.member;
            // Yanıtlama durumunda tüm args sebep sayılır
            sebep = args.join(' ') || 'Sebep belirtilmedi';
        } 
        // 2. Durum: Etiketleme (Mention) kontrolü
        else {
            const user = message.mentions.users.first();
            if (user) {
                targetMember = message.guild.members.resolve(user);
            }
        }

        // Kullanıcı bulundu mu kontrolü
        if (!targetMember) {
            return message.reply('Lütfen banlamak istediğin kişiyi etiketle veya mesajını yanıtla!');
        }

        // Kendini veya botu banlamayı önleme
        if (targetMember.id === message.author.id) return message.reply('Kendini banlayamazsın!');
        if (!targetMember.bannable) return message.reply('Bu kullanıcıyı banlamak için yetkim yetmiyor.');

        try {
            await targetMember.ban({ reason: sebep });
            message.channel.send(` **${targetMember.user.tag}** başarıyla sunucudan yasaklandı. \n**Sebep:** ${sebep}`);
        } catch (error) {
            console.error(error);
            message.reply('Ban işlemi sırasında bir hata oluştu.');
        }
    },
};