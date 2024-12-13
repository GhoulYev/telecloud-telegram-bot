import { PrismaClient } from '@prisma/client';
import { Context } from 'telegraf';

export const reset = async (prisma: PrismaClient, ctx: Context) => {
	if (!ctx.message) {
		return;
	}
	prisma.user
		.findUnique({
			where: {
				id: ctx.from?.id,
			},
		})
		.then((result) => {
			if (!result) {
				prisma.user
					.update({
						data: {
							step: 0,
						},
						where: {
							id: ctx.from!.id,
						},
					})
					.then(() => ctx.reply('Введите новый поддомен'));
			} else {
				ctx.reply('Введите /start для начала работы!');
			}
		});
};
