// Copyright (c) 2023 Northern Star
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { InteractionHandler, InteractionHandlerTypes, type PieceContext } from '@sapphire/framework';
import { type ButtonInteraction, ChannelType, EmbedBuilder } from 'discord.js';
import { ticketActionRow } from '../../../lib/constants';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'question') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {
    await interaction.reply({ephemeral: true, content:"Questin Ticket created successfully ✅"});
    const channel = await interaction.guild?.channels.create({ name: `Question-${interaction.user.username}`, parent: "1110921560837070848", type: ChannelType.GuildText });
    await channel?.permissionOverwrites.edit(interaction.user, { ViewChannel: true, SendMessages: true, ReadMessageHistory: true })
    await channel?.send({ embeds: [new EmbedBuilder()
        .setTitle(`${interaction.user.tag}s Question Ticket`)
        .setDescription(`Hello ${interaction.user.tag}, Feel free to ask any question here!`)
        .setColor('DarkRed')
        .setTimestamp()], components: [ticketActionRow]});
    const msg = await channel?.send(`${interaction.member}`)
    await msg?.delete();
}
}