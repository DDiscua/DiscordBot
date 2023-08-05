import { CommandInteraction } from "discord.js";
import {
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";

export interface Command {
    data:
    | Omit<SlashCommandBuilder, "addSubcommandGroup" | "addSubcommand">
    | SlashCommandSubcommandsOnlyBuilder;
    run: (interaction: CommandInteraction) => Promise<void>;
}

export const oneHundred: Command = {
    data: new SlashCommandBuilder()
        .setName("100")
        .setDescription("Check in for the 100 Days of Code challenge.")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("The message to go in your 100 Days of Code update.")
                .setRequired(true)
        ),
    run: async (interaction) => {
        await interaction.deferReply();
        const { user } = interaction;
        const text = interaction.options.getString("message", true);
    },
};