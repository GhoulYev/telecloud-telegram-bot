# Telecloud telegram bot

Telegram bot for my project. This bot is one of the possible ways to upload files to the backend. It supports uploading files up to 20mb.

# Deploy

To deploy the bot, download the repository to your machine. You will need `NodeJS v20.15` and `npm/yarn latest version for deployment`.

In the project directory, type in the console:

```
npm install
```

or

```
yarn add
```

In the .env file, change the data to suit your needs
TOKEN - token of your Telegram bot.
DATABASE_URL - path to your database. You can leave it by default.
API_URL - URL of backend API.
SITE_URL - domain name of the site where the frontend is located.

After changing all the data, generate prisma types

```
npx prisma generate
```

and

```
npm run start
```

or

```
yarn run start
```
