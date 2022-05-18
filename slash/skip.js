import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

// quit the playlist of songs

module.exports = {
    data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips current song'),

    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue){
            return await interaction.editReply("There are no songs in the queue")
        }

        const currentSong = queue.current

        queue.skip()
        await interaction.editReply({
            embeds: [
                new MessageEmbed().setDescription(`The current song ${currentSong.title} has been skipped`).setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}

