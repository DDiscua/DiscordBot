import { REST, Routes } from 'discord.js';
import { COMMANDS } from "./commands";


const registerSlashCommand = async (TOKEN: string, BOT_APP_ID: string) => {
    try {

        const rest = new REST({ version: '10' }).setToken(TOKEN);
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(BOT_APP_ID), { body: COMMANDS });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

export { registerSlashCommand };
