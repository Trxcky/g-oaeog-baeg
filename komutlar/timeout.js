module.exports = {
    name: 'timeout',
    async execute(message, args) {
        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply('Bu komutu kullanmak için **Üyeleri Düzenle (Sustur)** yetkin olmalı.');
        }

        let targetMember;
        let sureStr;
        let sebep;

        // 1. Durum: Mesaj yanıtlama (Reply)
        if (message.reference) {
            const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
            targetMember = repliedMessage.member;
            sureStr = args[0];
            sebep = args.slice(1).join(' ') || 'Sebep belirtilmedi';
        } 
        // 2. Durum: Etiketleme (Mention)
        else {
            const user = message.mentions.users.first();
            targetMember = message.guild.members.resolve(user);
            sureStr = args[1];
            sebep = args.slice(2).join(' ') || 'Sebep belirtilmedi';
        }

        if (!targetMember) return message.reply('Lütfen birini etiketle veya mesajını yanıtla!');
        if (!sureStr) return message.reply('Lütfen bir süre belirt! Örnek: `5m`, `10m`, `1h`');

        // Süreyi milisaniyeye çevirme (m = dakika, h = saat, d = gün)
        const birim = sureStr.slice(-1);
        const miktar = parseInt(sureStr);
        let ms = 0;

        if (birim === 'm') ms = miktar * 60 * 1000;
        else if (birim === 'h') ms = miktar * 60 * 60 * 1000;
        else if (birim === 'd') ms = miktar * 24 * 60 * 60 * 1000;
        else return message.reply('Geçersiz süre formatı! Dakika için `m` kullanmalısın (Örn: 5m).');

        try {
            await targetMember.timeout(ms, sebep);
            message.channel.send(`✅ **${targetMember.user.tag}**, **${sureStr}** süreliğine susturuldu. \n**Sebep:** ${sebep}`);
        } catch (error) {
            console.error(error);
            message.reply('Bu kullanıcıyı susturmak için yetkim yetmiyor.');
        }
    },
};