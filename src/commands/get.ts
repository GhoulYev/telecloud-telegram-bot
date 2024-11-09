import { Context } from 'telegraf';

export const get = (ctx: Context) => {
	ctx.reply(`${process.env.SITE_URL}`);
};
