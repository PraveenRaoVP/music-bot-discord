import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

// shuffle the order in the queue of songs
 
module.exports = {
    data: new SlashCommandBuilder()
    .setName('shuffle')
    .setDescription('Shuffle song order in the queue'),

    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue){
            return await interaction.editReply("There are no songs in the queue")
        }
        queue.shuffle()
        await interaction.editReply("Shuffled successfully")
    }
}

