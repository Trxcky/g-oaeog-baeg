const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    name: 'dc',
    description: 'Doğruluk mu Cesaret mi oyunu.',
    async execute(message, args) {
        const embed = new EmbedBuilder()
            .setColor('#FF00FF')
            .setTitle(' Doğruluk mu? Cesaret mi?')
            .setDescription(`${message.author}, seçimini yap! \n\n**Doğruluk:** Dürüstçe cevap vermelisin. \n**Cesaret:** Verilen görevi yapmalısın.`)
            .setThumbnail(message.client.user.displayAvatarURL())
            .setFooter({ text: 'Zulum Guard DC Sistemi' });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('dogruluk').setLabel('Doğruluk').setStyle(ButtonStyle.Primary),
                new ButtonBuilder().setCustomId('cesaret').setLabel('Cesaret').setStyle(ButtonStyle.Danger),
            );

        const response = await message.reply({ embeds: [embed], components: [row] });

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        const sorular = {
            dogruluk: [
                "Atatürk ile Erdoğan vs atsa kim alır?", "En sevdiğin yetişkin içerik yıldızı kim?", "Babanla mı yoksa annenle mi daha iyi anlaşırsın?", "Sence gerçeklik nedir?", "Bu sunucunun en iyi yetkilisi sence kim?", "Sunucudaki en sinir bozucu kişi kim?", "Hiç bir yetkiliye 'abi' deyip arkasından küfrettin mi?", "Birine yanlışlıkla aşk mesajı attığın en saçma an hangisi?", "Sırf kız/erkek olduğunu düşündüğün için birine yardım ettin mi?", "Hiç Nitro'su olan birine 'Abi bir boost be' dedin mi?",
                "Discord'da hiç fake hesap açıp birini stalkladın mı?", "Sunucudaki hangi kız/erkek sana en yakın geliyor?", "Hiç bir sunucuda kuralları ihlal edip suçu başkasına attın mı?", "Mikrofonun açık olduğunu unutup yaptığın en utanç verici şey nedir?", "Hiç bir kıza/erkeğe sırf rol almak için yaranmaya çalıştın mı?", "Discord'da yaptığın en büyük mallık nedir?", "Bu sunucuda 'asla konuşmam' dediğin biri var mı?", "Hiç bir moderatörü haksız yere şikayet ettin mi?", "En son kimi DM'den engelledin ve neden?", "Sunucuda en çok kime gıcık oluyorsun?",
                "Hiç bir kıza/erkeğe DM'den özel fotoğraf istedin mi?", "Gece yatağında Discord'da en son neye baktın?", "Sunucu sahibine hiç küfrettin mi?", "Hiç birine aşık olup onun olduğu tüm kanallara girdin mi?", "En saçma nickin neydi?", "Hiç birini susturmak (mute) için yalan söyledin mi?", "Discord'da en çok kaç saat aralıksız takıldın?", "Hiç bir sunucudan banlandığında başka hesapla geri geldin mi?", "Telefondaki en utanç verici fotoğrafın ne?", "Sence bu sunucudaki en yakışıklı/güzel kişi kim?",
                "Hiç birinin sesini gizlice kaydedip başkasına dinlettin mi?", "Bir yetkili seni uyardığında içinden ne dedin?", "Hiç bir sunucuyu patlatmayı (raid) düşündün mü?", "En büyük takıntın nedir?", "Sence sunucudaki en boş insan kim?", "Hiç birine yanlışlıkla 'seni seviyorum' yazdın mı?", "Profiline bakıp bakıp güldüğün biri var mı?", "Hiç bir sunucuda 'kızım' diyerek milleti kandırdın mı?", "En son ne zaman banyo yaptın?", "Hiç Discord üzerinden para kaybettin mi?",
                "Sunucudaki en 'ezik' bulduğun kişi kim?", "Hiç birine küfredip sonra mesajı sildin mi?", "Bir moderatörle sevgili olmayı düşündün mü?", "Hiç birinin profil fotoğrafını çalıp kendi profilin yaptın mı?", "Bu sunucuda en çok kimin banlanmasını istersin?", "Hiç birine DM'den 'boş yapma' yazıp sildin mi?", "En sevdiğin Discord emojisi hangisi ve neden?", "Hiç birine sesli kanalda küfredip kaçtın mı?", "Kendi adını hiç Google'da arattın mı?", "Sence sunucu sahibi görevini iyi yapıyor mu?",
                "Hiç birine 'botum' diyerek şaka yaptın mı?", "Discord'da en çok vakit geçirdiğin kanal hangisi?", "Hiç bir sunucuda 'adminlik' satın aldın mı?", "En son kimi kıskandın?", "Sunucuda kimin sesini duyunca irkiliyorsun?", "Hiç bir sunucuda sahte çekiliş yaptın mı?", "En saçma takma adın neydi?", "Sence bu sunucunun en büyük sorunu ne?", "Hiç birine 'senin için ölürüm' dedin mi?", "Discord'da kaç kişiyi engelledin?",
                "Hiç birine 'sesin çok güzel' deyip yalan söyledin mi?", "En son kime 'iyiyim' deyip yalan söyledin?", "Hiç bir sunucuda yetki için para verdin mi?", "Sence sunucudaki en zeki kişi kim?", "Hiç birine yanlışlıkla ekran açıp rezil oldun mu?", "Discord'da yaptığın en büyük troll neydi?", "En sevdiğin oyun hangisi?", "Hiç bir sunucuda 'kurucuyum' diye yalan söyledin mi?", "Sence sunucudaki en havalı kişi kim?", "Hiç birine 'seni tanıyorum' deyip korkuttun mu?",
                "En son ne zaman ağladın?", "Hiç bir sunucuda 'ban yiyeceksin' diye birini korkuttun mu?", "Sence bu sunucunun en komik kişisi kim?", "Hiç birine 'profilin çok güzel' deyip yalan söyledin mi?", "Discord'da en çok kimi özledin?", "Hiç bir sunucuda 'modluk' için yalvardın mı?", "En saçma hobin ne?", "Sence sunucudaki en çalışkan yetkili kim?", "Hiç birine 'seni seviyorum' deyip sonra 'kuzenim yazmış' dedin mi?", "Discord'da en çok hangi oyunu oynuyorsun?",
                "Hiç bir sunucuda 'yetkiliyim' diye birini kandırdın mı?", "Sence sunucudaki en yardımsever kişi kim?", "Hiç birine 'sesin gelmiyor' deyip dalga geçtin mi?", "En son kime 'çıkmam lazım' deyip Discord'da takılmaya devam ettin?", "Hiç bir sunucuda 'vip' oldun mu?", "Sence sunucudaki en ciddi kişi kim?", "Hiç birine 'seni reportladım' deyip korkuttun mu?", "En saçma rüyan neydi?", "Sence bu sunucunun en aktif kişisi kim?", "Hiç bir sunucuda 'etiket' kovaladın mı?",
                "En son kime 'mesajını görmemişim' diye yalan söyledin?", "Sence sunucudaki en gizemli kişi kim?", "Hiç birine 'kameran açık' deyip şaka yaptın mı?", "En sevdiğin yemek ne?", "Sence sunucudaki en 'toxic' kişi kim?", "Hiç bir sunucuda 'partnerlik' yaptın mı?", "En son kime 'sesin çok az geliyor' dedin?", "Sence bu sunucunun en iyi komudu hangisi?", "Hiç birine 'bot yazıyorum' diye yalan söyledin mi?", "Son sorun: Beni seviyor musun?"
            ],
            cesaret: [
                "Sunucu sahibine DM'den 'Naber canım?' yaz ve ekran görüntüsünü at.", "En son attığın 3 emojiyi genel sohbete at.", "Sunucudaki rastgele birine 'Ben aslında bir botum' yaz.", "Profil fotoğrafını 5 dakikalığına en sevmediğin üyenin fotoğrafı yap.", "Genel sohbete 'Ben bu sunucunun gizli hayranıyım' diye bağır.", "Hiç tanımadığın birine DM'den rastgele bir yemek tarifi gönder.", "Bir sonraki mesajını sadece emojilerle yaz.", "Bir yetkiliye 'Seni seviyorum ama banlama' yaz.", "Kullanıcı adını 10 dakikalığına 'Zulum Mağduru' yap.", "Genel sohbete gidip 'Bu mesajı gören herkes çok yakışıklı/güzel' yaz.",
                "Rastgele bir üyeyi etiketle ve ona 'Neden beni takip ediyorsun?' yaz.", "5 dakika boyunca her mesajının sonuna 'miyav' ekle.", "Sunucu sahibinin son mesajına 🤡 emojisi bırak.", "Kullanıcı adını 'Sunucu Kölesi' yap ve 10 dakika öyle kalsın.", "Bir yetkiliye DM'den 'Beni banlar mısın?' yaz.", "Genel sohbette 3 dakika boyunca sadece büyük harfle konuş.", "Rastgele birine 'Seninle evlenmek istiyorum' yaz.", "Profil açıklamanı 'Ben bir Discord botuyum' olarak değiştir.", "Bir ses kanalına girip 'Zulum Guard aktif!' diye bağır ve çık.", "En sevmediğin kişiyi etiketleyip 'Seni seviyorum' de.",
                "Bir moderatöre 'Senin yerinde olsam kendimi banlardım' yaz.", "5 dakika boyunca her mesajına 'hav hav' ekle.", "Genel sohbete 'Ben aslında bir kızım/erkeğim' yaz (Tersi).", "Sunucudaki en aktif kişiye 'Boş yapma' yaz.", "Profil fotoğrafını bir patates resmi yap.", "Rastgele birine 'Borcum ne kadardı?' yaz.", "Genel sohbete 'Ben bu sunucunun en yakışıklısıyım/güzeliyim' yaz.", "Bir yetkiliye 'Neden bu kadar ciddisin?' yaz.", "Kullanıcı adını 'Beni Kimse Sevmiyor' yap.", "Genel sohbete 'Ben aslında bir uzaylıyım' yaz.",
                "Rastgele bir üyeyi etiketle ve 'Hesabını bana ver' de.", "5 dakika boyunca her mesajın sonuna 'anlayan anladı' yaz.", "Sunucu sahibine 'Senin yerinde olsam sunucuyu silerdim' yaz.", "Profil açıklamanı 'Zulum Guard hayranıyım' yap.", "Bir ses kanalına girip şarkı söyle ve hemen çık.", "Rastgele birine 'Seni rüyamda gördüm' yaz.", "Genel sohbete 'Ben aslında bir hackerım' yaz.", "Bir yetkiliye 'Bana rol verir misin?' diye yalvar.", "Kullanıcı adını 'Etiketçi' yap ve milleti etiketle.", "Genel sohbete 'Ben bu sunucunun en boş insanıyım' yaz.",
                "Rastgele bir üyeye 'Seninle oyun oynamak istiyorum' yaz.", "5 dakika boyunca sadece İngilizce konuş.", "Sunucu sahibine 'Seni çok özledim' yaz.", "Profil fotoğrafını bir emoji yap.", "Bir ses kanalına girip 'Merhaba dünya' de ve çık.", "Rastgele birine 'Seni tanıyor muyum?' yaz.", "Genel sohbete 'Ben aslında bir ajandım' yaz.", "Bir yetkiliye 'Beni neden sevmiyorsun?' yaz.", "Kullanıcı adını 'Uykusuz' yap.", "Genel sohbete 'Ben bu sunucunun en zekisiyim' yaz.",
                "Rastgele bir üyeyi etiketle ve 'Naber müdür?' de.", "5 dakika boyunca her mesajın sonuna 'nokta' yaz.", "Sunucu sahibine 'Sunucu çok güzel' yaz (Ciddi).", "Profil açıklamanı 'Boş yapma' yap.", "Bir ses kanalına girip gül ve çık.", "Rastgele birine 'Seni çok seviyorum' yaz.", "Genel sohbete 'Ben aslında bir hayaletim' yaz.", "Bir yetkiliye 'Seninle gurur duyuyorum' yaz.", "Kullanıcı adını 'Acıkmış' yap.", "Genel sohbete 'Ben bu sunucunun en havalısıyım' yaz.",
                "Rastgele bir üyeyi etiketle ve 'Bana para ver' de.", "5 dakika boyunca sadece büyük harf kullan.", "Sunucu sahibine 'Neden bu kadar iyisin?' yaz.", "Profil fotoğrafını siyah yap.", "Bir ses kanalına girip 'Burada kimse var mı?' de ve çık.", "Rastgele birine 'Seni bir yerden tanıyorum' yaz.", "Genel sohbete 'Ben aslında bir yapay zekayım' yaz.", "Bir yetkiliye 'Seni banlayabilir miyim?' yaz.", "Kullanıcı adını 'Yorgun' yap.", "Genel sohbete 'Ben bu sunucunun en iyisiyim' yaz.",
                "Rastgele bir üyeyi etiketle ve 'Beni seviyor musun?' de.", "5 dakika boyunca her mesajın sonuna 'ünlem' koy.", "Sunucu sahibine 'Selamın aleyküm' yaz.", "Profil açıklamanı 'Zulum Guard Koruma' yap.", "Bir ses kanalına girip 'Bot aktif!' de ve çık.", "Rastgele birine 'Sana bir sır vereceğim' yaz.", "Genel sohbete 'Ben aslında bir vampirim' yaz.", "Bir yetkiliye 'Nasılsın?' yaz.", "Kullanıcı adını 'Mutlu' yap.", "Genel sohbete 'Ben bu sunucunun en aktifiyim' yaz.",
                "Rastgele bir üyeyi etiketle ve 'Neden buradasın?' de.", "5 dakika boyunca her mesajın sonuna 'soru işareti' koy.", "Sunucu sahibine 'Bot çok iyi' yaz.", "Profil fotoğrafını beyaz yap.", "Bir ses kanalına girip 'Hoşça kalın' de ve çık.", "Rastgele birine 'Bana bir şaka yap' yaz.", "Genel sohbete 'Ben aslında bir robotum' yaz.", "Bir yetkiliye 'Yardım lazım mı?' yaz.", "Kullanıcı adını 'Üzgün' yap.", "Genel sohbete 'Ben bu sunucunun en çalışkanıyım' yaz.",
                "Rastgele bir üyeyi etiketle ve 'Sen kimsin?' de.", "5 dakika boyunca sadece küçük harf kullan.", "Sunucu sahibine 'Görüşürüz' yaz.", "Profil açıklamanı 'Komut Yazıyorum' yap.", "Bir ses kanalına girip öksür ve çık.", "Rastgele birine 'Bana bir soru sor' yaz.", "Genel sohbete 'Ben aslında bir insanım' yaz.", "Bir yetkiliye 'Görüşürüz' yaz.", "Kullanıcı adını 'Zulum Guard' yap (10 dk).", "Son görev: Bu oyunu bitir!"
            ]
        };

        collector.on('collect', async i => {
            if (i.user.id !== message.author.id) return i.reply({ content: 'Bu oyunu sadece komutu yazan oynayabilir!', ephemeral: true });

            const liste = sorular[i.customId];
            const rastgele = liste[Math.floor(Math.random() * liste.length)];

            const sonucEmbed = new EmbedBuilder()
                .setColor(i.customId === 'dogruluk' ? '#3498db' : '#e74c3c')
                .setTitle(i.customId === 'dogruluk' ? '💡 Doğruluk' : '⚔️ Cesaret')
                .setDescription(`**${rastgele}**`)
                .setFooter({ text: `${message.author.tag} tarafından seçildi.` });

            await i.update({ embeds: [sonucEmbed], components: [] });
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                row.components.forEach(btn => btn.setDisabled(true));
                response.edit({ components: [row] }).catch(() => {});
            }
        });
    },
};