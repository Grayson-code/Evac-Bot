// Copyright (c) 2023 Northern Star
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { InteractionHandler, InteractionHandlerTypes,type PieceContext } from '@sapphire/framework';
import { type ButtonInteraction, PermissionsBitField, TextChannel } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'done') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {
    if (!interaction.inCachedGuild()) return
    if (!interaction.member?.permissions.has(PermissionsBitField.Flags.SendMessages)) return;
    await (interaction.channel! as TextChannel).permissionOverwrites.edit(interaction.user , {SendMessages:false, ViewChannel:false});
    await (interaction.channel as TextChannel).edit({name: `Archived-${Math.round(Math.random() * 100)}`});
  }
}