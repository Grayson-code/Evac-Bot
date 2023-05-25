// Copyright (c) 2023 Northern Star
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { InteractionHandler, InteractionHandlerTypes, type PieceContext } from '@sapphire/framework';
import { PermissionsBitField, type ButtonInteraction, type TextChannel } from 'discord.js';

export class ButtonHandler extends InteractionHandler {
  public constructor(ctx: PieceContext, options: InteractionHandler.Options) {
    super(ctx, {
      ...options,
      interactionHandlerType: InteractionHandlerTypes.Button
    });
  }

  public override parse(interaction: ButtonInteraction) {
    if (interaction.customId !== 'lock') return this.none();

    return this.some();
  }

  public async run(interaction: ButtonInteraction) {
    if (!interaction.inCachedGuild()) return
    if (!interaction.member?.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ephemeral: true, content: "You dont have the required permissions!"})
    await (interaction.channel! as TextChannel).permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false, ViewChannel: false });
  }
}