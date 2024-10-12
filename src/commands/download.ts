import { PrismaClient } from '@prisma/client';
import { Context, NarrowedContext } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

export const download = async (
	prisma: PrismaClient,
	ctx: NarrowedContext<
		Context<Update>,
		{
			message:
				| (Update.New & Update.NonChannel & Message.AnimationMessage)
				| (Update.New & Update.NonChannel & Message.DocumentMessage);
			update_id: number;
		}
	>
) => {
	if (!ctx.message) {
		return;
	}
	prisma.user
		.findUnique({
			where: {
				id: ctx.message.from.id,
			},
		})
		.then((result) => {
			if (result?.step === 0) {
				ctx.reply('Вы не задали поддоменное имя!');
			} else {
				if (!ctx.update.message) {
					return;
				}
				const file = ctx.update.message.document;
				ctx.telegram.getFileLink(file.file_id).then((url) => {
					//place to API
					ctx.reply(`${url}`);
				});
			}
		});
};
