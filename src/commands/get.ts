import request from 'request';
import { Context } from 'telegraf';
import dotenv from 'dotenv';

export const get = (ctx: Context) => {
	const options = {
		method: 'POST',
		url: `${process.env.API_URL}/getuser`,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id: ctx.from?.id,
		}),
	};
	request(options, (error, response) => {
		if (error) {
			console.error(error);
		} else {
			ctx.reply(
				`Ваш домен: ${process.env.SITE_URL}/${
					JSON.parse(response.body).user.path
				}`
			);
		}
	});
};
