import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageEmbed, UserFlags } from "discord.js";
import { QueryType } from "discord-player";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('loads songs from yt')
        .addSubcommand((subcommand) => 
            subcommand.setName('song')
            .setDescription('Loads a single song from a given URL')
            .addStringOption((option) => option.setName('url').setDescription('song url').setRequired(true))
        )
        .addSubcommand((subcommand) =>
            subcommand.setName('playlist')
            .setDescription('Loads a playlist')
            .addStringOption((option) => option.setName('url').setDescription('playlist url').setRequired(true))
        )
        .addSubcommand((subcommand) => 
            subcommand.setName('search')
            .setDescription('Searches for a song with keywords')
            .addStringOption((option) => option.setName('searchterms').setDescription("the search keywords").setRequired(true))
        ),
        run: async ({ client, interaction })  => {
            if(!interaction.member.voice.channel){
                return interaction.editReply("You need to be in a Voice Chat to use this command")
            }
            
            const queue = await client.player.createQueue(interaction.guild)
            if(!queue.connection) await queue.connect(interaction.member.voice.channel)

            let embed = new MessageEmbed()

            //handle single song
            if(interaction.options.getSubcommand() === "song"){
                let url = interaction.options.getString('url')
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_VIDEO
                })
                if(result.tracks.length === 0) return interaction.editReply("No results found")

                const song = result.tracks[0]
                await queue.addTrack(song)
                embed.setDescription(`*** [${song.title}](${song.url}) *** has been added to the queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` })

            } else if(interaction.options.getSubcommand() === "playlist"){
                let url = interaction.options.getString('url')
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.YOUTUBE_PLAYLIST
                })
                if(result.tracks.length === 0) return interaction.editReply("No results found")

                const playlist = result.playlist
                await queue.addTracks(result.tracks)
                embed.setDescription(`***${result.tracks.length} songs from [${playlist.title}](${playlist.url})  has been added to the queue ***`)
                .setThumbnail(playlist.thumbnail)
            
            } else if(interaction.options.getSubcommand() === "search"){
                let url = interaction.options.getString('searchterms')
                const result = await client.player.search(url, {
                    requestedBy: interaction.user,
                    searchEngine: QueryType.AUTO
                })
                if(result.tracks.length === 0) return interaction.editReply("No results found")

                const song = result.tracks[0]
                await queue.addTrack(song)
                embed.setDescription(`*** [${song.title}](${song.url}) *** has been added to the queue`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Duration: ${song.duration}` })
            }

            if(!queue.playing) await queue.play()
            await interaction.editReply({
                embeds: [embed]
            })
        },
        
}