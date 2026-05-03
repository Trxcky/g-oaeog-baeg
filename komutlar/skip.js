module.exports = {
    name: 'skip',
    description: 'Çalan şarkıyı atlar ve sıradakine geçer.',
    async execute(message) {
        const queue = message.client.distube.getQueue(message);
        
        if (!queue) {
            return message.reply('⚠️ Atlanacak bir şarkı bulunmuyor.');
        }

        try {
            // Eğer kuyrukta sadece 1 şarkı varsa stop işlemi yapması daha sağlıklıdır
            if (queue.songs.length <= 1) {
                queue.stop();
                return message.reply('⏭️ Kuyrukta başka şarkı olmadığı için müzik durduruldu.');
            }

            await queue.skip();
            message.reply('⏭️ Sıradaki şarkıya geçiliyor...');
        } catch (e) {
            message.reply('❌ Şarkı atlanırken bir hata oluştu (Kuyrukta başka şarkı olmayabilir).');
        }
    },
};