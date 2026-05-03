const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'rolver',
    description: 'Etiketlenen kullanıcıya belirtilen rolü verir.',
    async execute(message, args) {
        // 1. Yetki Kontrolü: Sadece "ManageRoles" yetkisi olanlar kullanabilsin
        if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.reply('Bu komutu kullanmak için `Rolleri Yönet` yetkisine sahip olmalısın!');
        }

        const kullanıcı = message.mentions.members.first();
        const rol = message.mentions.roles.first();

        // 2. Argüman Kontrolleri
        if (!kullanıcı) return message.reply('Lütfen rol verilecek kullanıcıyı etiketleyin. Örnek: `!rolver @kullanıcı @rol`');
        if (!rol) return message.reply('Lütfen verilecek rolü etiketleyin.');

        // 3. Botun Yetki Kontrolü
        if (rol.position >= message.guild.members.me.roles.highest.position) {
            return message.reply('Bu rol benim yetkimden daha üstte olduğu için veremiyorum');
        }

        try {
            await kullanıcı.roles.add(rol);
            
            const embed = new EmbedBuilder()
                .setTitle('Rol Verildi')
                .setDescription(`${kullanıcı} kullanıcısına ${rol} rolü başarıyla tanımlandı.`)
                .setColor('#2ecc71')
                .setFooter({ text: `Yetkili: ${message.author.tag}` })
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            message.reply('Rol verilirken bir hata oluştu. Botun rolünün, vermeye çalıştığın rolden üstte olduğundan emin ol.');
        }
    },
};