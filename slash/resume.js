import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

// reusme the playlist of songs

module.exports = {
    data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the queue'),

    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue){
            return await interaction.editReply("There are no songs in the queue")
        }
        
        queue.setPaused(false)
        await interaction.editReply("Music has been resumed. Use '/pause' to pause the music")
    }
}

