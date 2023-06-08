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
		const channel = await interaction.guild?.channels.create({ name: `Proof-${interaction.user.username}-${interaction.user.id}`, parent: "1110921513080733696", type: ChannelType.GuildText });
		await channel?.permissionOverwrites.edit(interaction.user, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true })
		await channel?.send({
			embeds: [new EmbedBuilder()
				.setTitle(`${interaction.user.tag}s Proof Ticket`)
				.setDescription(`Hello ${interaction.user.tag}\n
				Please provide your proof of completion below. Along with whos sponsor it is and what has been completed in this format ex.\n
				Level 5 operations: ✅\nLevel 10 operations: ❌️\n2nd ship: ✅\npayment type:\nname:\nproof:`)
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
