import { join } from 'path';
import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export const rootDir = join(__dirname, '..', '..');
export const srcDir = join(rootDir, 'src');

export const RandomLoadingMessage = ['Computing...', 'Thinking...', 'Cooking some food', 'Give me a moment', 'Loading...'];
export const tickets = new Map();

const lock = new ButtonBuilder()
    .setCustomId("lock")
    .setLabel("Lock 🔒")
    .setStyle(ButtonStyle.Primary);
const remove = new ButtonBuilder()
    .setCustomId("remove")
    .setLabel("Delete 🛑")
    .setStyle(ButtonStyle.Danger);
const done = new ButtonBuilder()
    .setCustomId("done")
    .setLabel("Done ✅")
    .setStyle(ButtonStyle.Success);

export const ticketActionRow = new ActionRowBuilder<ButtonBuilder>()
    .setComponents(lock, done, remove);
