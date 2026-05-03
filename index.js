// --- CRITICAL POLYFILLS (Railway Hatalarını Engellemek İçin) ---
const { Blob } = require('node:buffer');
if (typeof File === 'undefined') {
    global.Blob = Blob;
    global.File = class File extends Blob {
        constructor(parts, filename, options = {}) {
            super(parts, options);
            this.name = filename;
            this.lastModified = options.lastModified || Date.now();
        }
    };
}

const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const fs = require('fs');
const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');
const { SpotifyPlugin } = require('@distube/spotify');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]
});

// --- MÜZİK MOTORU KURULUMU ---
client.distube = new DisTube(client, {
    plugins: [new YouTubePlugin(), new SpotifyPlugin()],
    leaveOnEmpty: true,
    leaveOnFinish: true,
    emitNewSongOnly: true,
});

client.distube
    .on('playSong', (queue, song) => {
        queue.textChannel.send(`🎶 Şu an çalıyor: **${song.name}**\nİsteyen: ${song.user}`);
    })
    .on('addSong', (queue, song) => {
        queue.textChannel.send(`✅ Kuyruğa eklendi: **${song.name}**`);
    })
    .on('error', (channel, e) => {
        if (channel) channel.send(`❌ Müzik hatası: ${e.message.slice(0, 1900)}`);
    });

// Veri Saklama
client.commands = new Collection();
client.db = new Map(); 
client.afkData = new Map(); 
const spamMap = new Map();

// 1. KOMUT YÜKLEYİCİ
if (fs.existsSync('./komutlar')) {
    const commandFiles = fs.readdirSync('./komutlar').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        try {
            const command = require(`./komutlar/${file}`);
            client.commands.set(command.name, command);
        } catch (err) {
            console.error(`Komut yüklenemedi: ${file} - Hata: ${err.message}`);
        }
    }
}

// 2. ANA MESAJ OLAYI
client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return;

    // AFK Çıkış
    if (client.afkData.has(message.author.id)) {
        client.afkData.delete(message.author.id);
        message.reply("Tekrar hoş geldin! AFK modundan çıkarıldın.").then(m => setTimeout(() => m.delete().catch(() => {}), 5000));
    }

    // Mesaj Kontrolleri (SA-AS, Link Engel vb.)
    const msg = message.content.toLowerCase();
    if (msg === 'sa') message.reply('Aleyküm Selam!');

    // Komut Çalıştırıcı
    const prefix = "!"; 
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if (command) {
        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('Komut çalıştırılırken bir hata oluştu!');
        }
    }
});

// 3. LOG VE DİĞER OLAYLAR
client.once('ready', () => {
    console.log(`ZULUM GUARD Aktif: ${client.user.tag}`);
});

// Global Hata Yakalayıcı (Çökmeyi Önler)
process.on('unhandledRejection', error => console.error('Hata:', error));
process.on('uncaughtException', error => console.error('Kritik Hata:', error));

client.login(process.env.TOKEN);