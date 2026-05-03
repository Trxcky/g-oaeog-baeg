module.exports = {
    name: 'play',
    description: 'Şarkı çalar veya kuyruğa ekler.',
    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        
        if (!voiceChannel) {
            return message.reply('❌ Bir şarkı çalmak için önce bir ses kanalına girmelisin!');
        }

        const query = args.join(' ');
        if (!query) {
            return message.reply('❓ Hangi şarkıyı çalmamı istersin? (İsim veya Link yazabilirsin)');
        }

        try {
            message.client.distube.play(voiceChannel, query, {
                textChannel: message.channel,
                member: message.member,
                message
            });
            // Not: "playSong" olayı index.js'de tanımlı olduğu için 
            // burada sadece arama başladığına dair küçük bir bilgi veriyoruz.
            message.react('🔍');
        } catch (e) {
            console.error(e);
            message.reply('❌ Şarkı başlatılırken teknik bir hata oluştu.');
        }
    },
};