import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
import { start } from './commands/start';
import { register } from './commands/register';
import { reset } from './commands/reset';
import { download } from './commands/download';
dotenv.config();

if (!process.env.TOKEN) {
	throw new Error('Telegram token was not found in .env');
}

const telegraf = new Telegraf(process.env.TOKEN);
const prisma = new PrismaClient();

telegraf.start(async (ctx) => start(prisma, ctx));

telegraf.command('get', (ctx) => {
	//place to API
});

telegraf.command('set', (ctx) => reset(prisma, ctx));

telegraf.on('document', (ctx) => download(prisma, ctx));

telegraf.on('text', (ctx) => register(prisma, ctx));

telegraf.launch(() => console.log('Telegram bot has been launched!'));
