// Copyright (c) 2023 Northern Star
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { InteractionHandler, InteractionHandlerTypes, type PieceContext } from '@sapphire/framework';
import type { ButtonInteraction, GuildMember } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'Verify') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {
    await interaction.reply({
        ephemeral: true,
        content: "You have entered the gates of hell! Continue with caution."
    });
    const role = await interaction.guild!.roles.fetch("1105015486456004618");
    await (interaction.member as GuildMember)!.roles.add(role!)
  }
}