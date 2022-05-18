import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";

// display info of the song played the playlist of songs

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Displays current song info'),

    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue){
            return await interaction.editReply("There are no songs in the queue")
        }

        let bar = queue.createProgressBar({
            queue: false,
            length: 19
        })

        const song = queue.current;

        await interaction.editReply({
            embeds: [new MessageEmbed()
                .setThumbnail(song.thumbnail)
                .setDescription(`Currently playing ${song.title} - ${song.url}\n\n` + bar)
            ],
        })
    }
}

