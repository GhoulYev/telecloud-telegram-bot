import request from 'request';
import { Context } from 'telegraf';
import dotenv from 'dotenv';

export const get = (ctx: Context) => {
	ctx.reply(`${process.env.SITE_URL}`);
};
