module.exports = {
    name: 'kick',
    async execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has('KickMembers')) {
            return message.reply('Bu komutu kullanmak için **Üyeleri At** yetkin olmalı.');
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
            return message.reply('Lütfen sunucudan atmak istediğin kişiyi etiketle veya mesajını yanıtla!');
        }

        // Kendini veya botu atmayı önleme
        if (targetMember.id === message.author.id) return message.reply('Kendini sunucudan atamazsın!');
        if (!targetMember.kickable) return message.reply('Bu kullanıcıyı atmak için yetkim yetmiyor (Rolü benden üstte olabilir).');

        try {
            await targetMember.kick(sebep);
            message.channel.send(`✅ **${targetMember.user.tag}** başarıyla sunucudan atıldı. \n**Sebep:** ${sebep}`);
        } catch (error) {
            console.error(error);
            message.reply('Kick işlemi sırasında bir hata oluştu.');
        }
    },
};