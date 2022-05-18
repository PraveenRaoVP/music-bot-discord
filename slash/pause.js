import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

// pause the playlist of songs

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses music'),

    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue){
            return await interaction.editReply("There are no songs in the queue")
        }
        queue.setPaused(true)
        await interaction.editReply("Music has been paused. Use '/resume' to resume the music ")
    }
}

