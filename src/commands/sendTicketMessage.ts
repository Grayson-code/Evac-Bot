import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { type Message, ButtonBuilder, EmbedBuilder, ButtonStyle, type TextChannel, ActionRowBuilder } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	requiredUserPermissions: "Administrator"
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		(await (await message.client.channels.fetch('1110922161515925534') as TextChannel).send({
			components: [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder()
				.setCustomId("question").setLabel("Questions").setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId("proof").setLabel("Proof of Completion").setStyle(ButtonStyle.Success), new ButtonBuilder()
					.setCustomId("support").setLabel("Support").setStyle(ButtonStyle.Primary))], embeds: [new EmbedBuilder().setTitle("Support Tickets").setDescription("Select the one corresponding to what you need help with.\nStaff team will be with you as soon as they can.")
						.setFooter({ text: "Thanks for supporting us!", iconURL: "https://cdn.discordapp.com/attachments/1104277307469869077/1105026558231580682/the-boss-fight-with-lava-demon.png" })]
		}));
	}
}
