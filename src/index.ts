import dotenv from 'dotenv';
import { Telegraf } from 'telegraf';
dotenv.config();

if (!process.env.TOKEN) {
	throw new Error('Telegram token was not found in .env');
}

const telegraf = new Telegraf(process.env.TOKEN);

telegraf.launch(() => console.log('Telegram bot has been launched!'));
