module.exports = {
    name: 'nuke',
    async execute(message, args) {
        // Yetki kontrolü (Kanalları Yönet yetkisi gerekir)
        if (!message.member.permissions.has('ManageChannels')) {
            return message.reply('Bu komutu kullanmak için **Kanalları Yönet** yetkin olmalı!');
        }

        try {
            // Mevcut kanalın pozisyonunu ve özelliklerini al
            const pozisyon = message.channel.position;
            const isim = message.channel.name;

            // Kanalı kopyala (clone) ve eski kanalı sil
            const yeniKanal = await message.channel.clone();
            await message.channel.delete();

            // Yeni kanalı eski yerine taşı ve ilk mesajı at
            await yeniKanal.setPosition(pozisyon);
            yeniKanal.send('Kanal başarıyla sıfırlandı! \nhttps://imgur.com/vH9vYvA');

        } catch (error) {
            console.error(error);
            // Kanal silindiği için hata mesajı ancak loglara düşebilir
        }
    },
};