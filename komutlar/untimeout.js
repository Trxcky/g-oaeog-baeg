module.exports = {
    name: 'untimeout',
    async execute(message, args) {
        if (!message.member.permissions.has('ModerateMembers')) return;

        let targetMember;
        if (message.reference) {
            const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
            targetMember = repliedMessage.member;
        } else {
            const user = message.mentions.users.first();
            targetMember = message.guild.members.resolve(user);
        }

        if (!targetMember) return message.reply('Yasağını kaldırmak istediğin kişiyi etiketle veya mesajını yanıtla!');

        try {
            await targetMember.timeout(null);
            message.channel.send(`✅ **${targetMember.user.tag}** kullanıcısının susturması kaldırıldı.`);
        } catch (error) {
            message.reply('Bu kullanıcının susturmasını kaldıramıyorum.');
        }
    },
};