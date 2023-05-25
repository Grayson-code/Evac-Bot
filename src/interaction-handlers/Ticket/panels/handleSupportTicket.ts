import { ApplyOptions } from '@sapphire/decorators';
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import { type ButtonInteraction, EmbedBuilder, ChannelType } from 'discord.js';
import { ticketActionRow } from '../../../lib/constants';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Button
})
export class ButtonHandler extends InteractionHandler {
	public async run(interaction: ButtonInteraction) {
		await interaction.reply({ ephemeral: true, content: "Ticket created successfully ✅" });
		const channel = await interaction.guild?.channels.create({ name: `Support-${interaction.user.username}`, parent: "1110921491027087470", type: ChannelType.GuildText });
		await channel?.permissionOverwrites.edit(interaction.user, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true })
		await channel?.send({
			embeds: [new EmbedBuilder()
				.setTitle(`${interaction.user.tag}s Support Ticket`)
				.setDescription(`Hello ${interaction.user.tag} This is **YOUR** Support Ticket Please Make Sure to explain your issue as much as possible!`)
				.setColor('DarkRed')
				.setTimestamp()], components: [ticketActionRow]
		});
		const msg = await channel?.send(`${interaction.member}`)
		await msg?.delete();
	}

	public override parse(interaction: ButtonInteraction) {
		if (interaction.customId !== 'support') return this.none();

		return this.some();

	}
}
