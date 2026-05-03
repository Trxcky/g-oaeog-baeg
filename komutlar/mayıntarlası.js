module.exports = {
    name: 'mayintarlasi',
    description: 'Basit bir mayın tarlası oyunu oluşturur.',
    execute(message) {
        const satir = 5;
        const sutun = 5;
        const mayinSayisi = 5;

        let harita = Array.from({ length: satir }, () => Array(sutun).fill('||0️⃣||'));

        // Mayınları yerleştir
        let yerlestirilen = 0;
        while (yerlestirilen < mayinSayisi) {
            const r = Math.floor(Math.random() * satir);
            const c = Math.floor(Math.random() * sutun);
            if (harita[r][c] !== '||💣||') {
                harita[r][c] = '||💣||';
                yerlestirilen++;
            }
        }

        // Çıktıyı formatla
        const oyunAlani = harita.map(s => s.join(' ')).join('\n');

        message.channel.send(`**Mayın Tarlası!** (Toplam Mayın: ${mayinSayisi})\n\n${oyunAlani}`);
    },
};