const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'sesegir',
    execute(message, args) {
        // Yetki kontrolü
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('Bu komutu sadece **Yöneticiler** kullanabilir.');
        }

        const kanalID = args[0];
        if (!kanalID) return message.reply('Lütfen girmem gereken ses kanalının ID\'sini yaz! Örn: `!sesegir 123456789...`');

        const kanal = message.guild.channels.cache.get(kanalID);

        if (!kanal || kanal.type !== 2) { // 2 = GuildVoice (Ses Kanalı)
            return message.reply('Hatalı ID! Lütfen geçerli bir **ses kanalı** ID\'si girdiğinden emin ol.');
        }

        try {
            joinVoiceChannel({
                channelId: kanal.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator,
            });

            message.reply(`✅ Başarıyla **${kanal.name}** kanalına giriş yaptım!`);
        } catch (error) {
            console.error(error);
            message.reply('Ses kanalına girerken bir hata oluştu.');
        }
    },
};