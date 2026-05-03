module.exports = {
    name: 'afk',
    execute(message, args, client) {
        const sebep = args.join(" ") || "Sebep belirtilmedi";
        
        // Obje olarak timestamp ve sebep kaydediyoruz
        client.afkData.set(message.author.id, {
            sebep: sebep,
            timestamp: Date.now()
        });

        message.reply(`Artık AFK modundasın \n**Sebep:** ${sebep}`).then(m => {
            setTimeout(() => m.delete().catch(() => {}), 5000);
        });
    },
};