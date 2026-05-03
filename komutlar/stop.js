module.exports = {
    name: 'stop',
    description: 'Müziği tamamen durdurur ve bot kanaldan çıkar.',
    execute(message) {
        const queue = message.client.distube.getQueue(message);
        
        if (!queue) {
            return message.reply('⚠️ Şu an zaten çalan bir müzik yok.');
        }

        queue.stop();
        message.reply('🛑 Müzik durduruldu, kuyruk temizlendi ve kanaldan çıkış yapıldı.');
    },
};