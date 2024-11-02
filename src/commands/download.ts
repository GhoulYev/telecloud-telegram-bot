import { PrismaClient } from '@prisma/client';
import { Context, NarrowedContext } from 'telegraf';
import { Message, Update } from 'telegraf/typings/core/types/typegram';
import dotenv from 'dotenv';
import request from 'request';

dotenv.config();

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
					var options = {
						method: 'POST',
						url: `${process.env.API_URL}/upload`,
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							id: ctx.from.id,
							fileName: file.file_name,
							url,
						}),
					};
					request(options, function (error: string, response) {
						if (error) {
							ctx.reply('Произошла ошибка');
						} else {
							if (response.statusCode === 400) {
								ctx.reply(`${JSON.parse(response.body).message}`);
							} else {
								ctx.reply('Файл успешно загружен!');
							}
						}
					});
				});
			}
		});
};
