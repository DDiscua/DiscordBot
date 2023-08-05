import { Client } from "discord.js";
import { IntentOptions } from "./intentOptions";
import { processPayment } from "./payment";
import * as dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN || "";
const BOT_CLIENT_ID = process.env.BOT_CLIENT_ID || "";
const bot = new Client({ intents: IntentOptions });

bot.on("ready", () => {
    console.log(`Logged in as ${bot?.user?.tag}!`);
});

bot.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
    }

    if (interaction.commandName === 'pay') {
        const paymentProcess = await processPayment(interaction);
        interaction.reply(`Payment: ${paymentProcess}`);
    }
});

const runBot = async () => {
    await bot.login(BOT_TOKEN);
}


export { runBot, bot };