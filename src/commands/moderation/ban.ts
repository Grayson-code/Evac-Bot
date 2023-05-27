import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

@ApplyOptions<Command.Options>({
	description: 'A basic command',
	requiredUserPermissions: "BanMembers",
	requiredClientPermissions: "BanMembers",
})
export class UserCommand extends Command {
	public override async messageRun(message: Message) {
		const member = message.mentions.members?.first();
		if (!member) {
			return message.reply("The member doesn't exist!");
		};
		await member.ban();
	}
}
