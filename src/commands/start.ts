import { PrismaClient } from '@prisma/client';
import { Context } from 'telegraf';

export const start = async (prisma: PrismaClient, ctx: Context) => {
	prisma.user
		.findUnique({
			where: {
				id: ctx.message?.from.id,
			},
		})
		.then((result) => {
			if (!result) {
				if (!ctx.message) {
					throw new Error('Start message is empty');
				}
				prisma.user
					.create({
						data: {
							id: ctx.message.from.id,
							step: 0,
						},
					})
					.then(() =>
						ctx.reply('Привет, для начала работы со мной введи свой поддомен!')
					);
			}
		});
};
