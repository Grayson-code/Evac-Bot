import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import {type  Message, ButtonBuilder, ActionRowBuilder, EmbedBuilder, ButtonStyle, type TextChannel } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	requiredUserPermissions: "Administrator"
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		const channel = await message.client.channels.fetch('1110921767217803315') as TextChannel;
		channel.send({
			components: [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder()
				.setCustomId("Verify").setLabel("Let me enter").setStyle(ButtonStyle.Danger))], embeds: [new EmbedBuilder().setImage("https://cdn.discordapp.com/attachments/1104277307469869077/1105025902888362064/zombies-in-fire-banner.png").setTitle("Lucifer's Estate").setDescription("Click the button to verify and get access to the rest of hell. \n It has been warned that further you proceed you more likely you are to succumb to the inevitable.").setColor(0x8C1E00)]
		})
	}
}
