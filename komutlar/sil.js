module.exports = {
    name: 'sil',
    async execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('Mesajları yönetme yetkiniz bulunmuyor!');
        }

        const miktar = parseInt(args[0]);

        // Aralığı kontrol et (2 ile 500 arası)
        if (isNaN(miktar) || miktar < 2 || miktar > 500) {
            return message.reply('Lütfen 2 ile 500 arasında bir sayı girin!');
        }

        try {
            let kalan = miktar;
            
            // Discord 100'den fazla mesajı tek seferde silemediği için döngüye sokuyoruz
            while (kalan > 0) {
                const silinecek = kalan > 100 ? 100 : kalan;
                await message.channel.bulkDelete(silinecek, true);
                kalan -= silinecek;
                
                // API'yi yormamak için kısa bir bekleme
                if (kalan > 0) await new Promise(resolve => setTimeout(resolve, 1000));
            }

            message.channel.send(`✅ **${miktar}** adet mesaj başarıyla temizlendi.`)
                .then(msg => setTimeout(() => msg.delete(), 5000)); // 5 saniye sonra onay mesajını siler

        } catch (error) {
            console.error(error);
            message.reply('Mesajları silerken bir hata oluştu (14 günden eski mesajlar silinemez).');
        }
    },
};