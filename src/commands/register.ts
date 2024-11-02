import { PrismaClient } from '@prisma/client';
import request from 'request';
import { Context } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config();

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
						var options = {
							method: 'POST',
							url: `${process.env.API_URL}/setpath`,
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								id: ctx.from?.id,
								path: ctx.text ?? '',
							}),
						};
						request(options, function (error, response) {
							if (error) throw new Error(error);
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
						});
						break;
				}
			}
		});
};
