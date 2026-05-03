module.exports = {
    name: 'unban',
    async execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('Bu komutu kullanmak için **Üyeleri Yasakla** yetkin olmalı.');
        }

        const id = args[0];

        // ID kontrolü
        if (!id) {
            return message.reply('Lütfen yasağını kaldırmak istediğin kişinin **ID**sini yaz! \nÖrnek: `!unban 123456789012345678`');
        }

        try {
            // Sunucudaki yasaklıları kontrol et
            const banList = await message.guild.bans.fetch();
            const bannedUser = banList.get(id);

            if (!bannedUser) {
                return message.reply('Bu IDye sahip bir kullanıcı yasaklılar listesinde bulunamadı.');
            }

            // Yasak kaldır
            await message.guild.members.unban(id);
            message.channel.send(`✅ **${bannedUser.user.tag}** isimli kullanıcının yasağı başarıyla kaldırıldı.`);
        } catch (error) {
            console.error(error);
            message.reply('Yasak kaldırılırken bir hata oluştu. IDnin doğru olduğundan emin ol.');
        }
    },
};