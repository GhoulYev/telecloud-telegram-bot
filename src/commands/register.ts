import { PrismaClient } from '@prisma/client';
import { Context } from 'telegraf';

export const register = async (prisma: PrismaClient, ctx: Context) => {
	prisma.user
		.findUnique({
			where: {
				id: ctx.message?.from.id,
			},
		})
		.then((result) => {
			if (!result) {
				ctx.reply('Введи /start для начала');
			} else {
				switch (result.step) {
					case 0:
						//place to API
						if (!ctx.message) {
							return;
						}
						prisma.user
							.update({
								data: {
									step: 1,
								},
								where: {
									id: ctx.message.from.id,
								},
							})
							.then(() => {
								if (!ctx.text) {
									return;
								}
								ctx.reply(
									`Вы установили свой поддомен как ${ctx.text}. Получить свою ссылку можно при помощи команды /get`
								);
							});
						break;
				}
			}
		});
};
