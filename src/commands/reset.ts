import { PrismaClient } from '@prisma/client';
import { Context } from 'telegraf';

export const reset = async (prisma: PrismaClient, ctx: Context) => {
	if (!ctx.message) {
		return;
	}
	prisma.user
		.update({
			data: {
				step: 0,
			},
			where: {
				id: ctx.message.from.id,
			},
		})
		.then(() => ctx.reply('Введите новый поддомен'));
};
