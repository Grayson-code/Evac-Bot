// Copyright (c) 2023 Northern Star
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { sendTranscript } from '../../lib/utils';
import { InteractionHandler, InteractionHandlerTypes,type PieceContext } from '@sapphire/framework';
import { PermissionsBitField, type ButtonInteraction } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'remove') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {
    if (!interaction.inCachedGuild()) return;
    if (!interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ephemeral: true, content: "You dont have admin!"})
    await interaction.reply("Deleting Ticket.");
    await sendTranscript(interaction)
    await interaction.channel?.delete();
  }
}