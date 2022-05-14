import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed } from "discord.js";


module.exports = {
    data: new SlashCommandBuilder()
    .setName('Quit')
    .setDescription('Stops bot and clear queue'),

    run: async({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId);

        if(!queue){
            return await interaction.editReply("There are no songs in the queue")
        }
        queue.destroy()
    }
}