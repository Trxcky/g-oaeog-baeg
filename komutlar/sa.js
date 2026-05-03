module.exports = {
    name: 'sa',
    // Bu satır botun sadece !sa değil, mesajın içinde "sa" geçtiğinde de bakması için tetikleyici olabilir
    description: 'Selamlaşma komutu',
    execute(message, args) {
        // Kişiye yanıt vererek (reply) cevap verir
        message.reply('Aleyküm Selam hoş');
    },
};