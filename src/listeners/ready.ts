import { ApplyOptions } from '@sapphire/decorators';
import { Listener, type Store } from '@sapphire/framework';
import { blue, gray, green, magenta, magentaBright, white, yellow } from 'colorette';
import { EmbedBuilder, type Client, type TextChannel, ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

const dev = process.env.NODE_ENV !== 'production';

@ApplyOptions<Listener.Options>({ once: true })
export class UserEvent extends Listener {
	private readonly style = dev ? yellow : blue;

	public async run(client: Client) {
		this.printBanner();
		this.printStoreDebugInformation();
		this.sendVerifyMessage(client)
		this.sendTicketMessage(client)
		await client.guilds.fetch()
	}

	private printBanner() {
		const success = green('+');

		const llc = dev ? magentaBright : white;
		const blc = dev ? magenta : blue;

		const line01 = llc('');
		const line02 = llc('');
		const line03 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} ${pad}${blc('1.0.0')}
${line02} ${pad}[${success}] Gateway
${line03}${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${llc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}

	private async sendTicketMessage(client: Client) {
		(await (await client.channels.fetch('1105016597573288086') as TextChannel).send({components: [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder()
		.setCustomId("question").setLabel("Questions").setStyle(ButtonStyle.Secondary), new ButtonBuilder().setCustomId("proof").setLabel("Proof of Completion").setStyle(ButtonStyle.Success), new ButtonBuilder()
		.setCustomId("support").setLabel("Support").setStyle(ButtonStyle.Primary))], content: "E" }));
	}
	private async sendVerifyMessage(client:Client) {
		const channel = await client.channels.fetch('1104289679576141906') as TextChannel;
		channel.send({components: [new ActionRowBuilder<ButtonBuilder>().addComponents(new ButtonBuilder()
		.setCustomId("Verify").setLabel("Let me enter").setStyle(ButtonStyle.Danger))] ,embeds: [new EmbedBuilder().setImage("https://cdn.discordapp.com/attachments/1104277307469869077/1105025902888362064/zombies-in-fire-banner.png").setTitle("Lucifer's Estate").setDescription("Click the button to verify and get access to the rest of hell. \n It has been warned that further you proceed you more likely you are to succumb to the inevitable.").setColor(0x8C1E00)]})
	}
}
