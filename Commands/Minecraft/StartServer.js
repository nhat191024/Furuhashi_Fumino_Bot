const { SlashCommandBuilder, ChannelType, PermissionFlagsBits, Interaction } = require("discord.js");
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start the Minecraft server'),
    async execute(interaction, client) {
        exec('sudo systemctl start craftoria.service', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error starting server: ${error.message}`);
                interaction.reply('Failed to start the server.');
                return;
            }
            interaction.reply('Minecraft server is starting...');
            const channel = client.channels.cache.get(process.env.CHANNEL_ID);
            if (channel) {
                channel.send('Minecraft server has started!');
            }
        });
    },
};