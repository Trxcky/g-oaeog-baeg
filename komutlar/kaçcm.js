module.exports = {
    name: 'kaçcm',
    execute(message, args) {
        // 1 ile 100 arasında rastgele bir sayı oluşturur
        const rastgele = Math.floor(Math.random() * 100) + 1;

        // Mesajı gönderir
        message.reply(` **${rastgele} cm** `);
    },
};