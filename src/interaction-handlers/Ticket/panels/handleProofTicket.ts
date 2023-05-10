import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { type ButtonInteraction, EmbedBuilder, ChannelType } from 'discord.js';
import { ticketActionRow } from '../../../lib/constants';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class ButtonHandler extends InteractionHandler {
	public async run(interaction: ButtonInteraction) {
		await interaction.reply({ ephemeral: true, content: "Proof Ticket created successfully ✅" });
		const channel = await interaction.guild?.channels.create({ name: `Proof-${interaction.user.username}`, parent: "1105037416768741456", type: ChannelType.GuildText });
		await channel?.send({
			embeds: [new EmbedBuilder()
				.setTitle(`${interaction.user.tag}s Proof Ticket`)
				.setDescription(`Hello ${interaction.user.tag}, please send the proof.`)
				.setColor('DarkRed')
				.setTimestamp()], components: [ticketActionRow]
		});
		const msg = await channel?.send(`${interaction.member}`)
		await msg?.delete();
	}

	public override parse(interaction: ButtonInteraction) {
		if (interaction.customId !== 'proof') return this.none();

		return this.some();

	}
}
