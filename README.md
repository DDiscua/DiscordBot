# DiscordBot
Discord bot using GrammyJS, NodeJs and mongo Atlas

# How to run

User the following command to run the project 

```npm run dev```

# Env configuration

Follow env example for more details

## Database
- ENV=DEV
- MONGO_DB=mongodb+srv://
- MONGO_DB_USER=
- MONGO_DB_PASSWORD=
- MONGO_DB_NAME=db
- MONGO_DB_HOST=

## Bot
- BOT_NAME=
- BOT_TOKEN=


## Logger
- DATADOG_ENABLED_LOGS=false
- APPLICATION_NAME=BotApp
- DATADOG_API_KEY_DEV=
- DATADOG_APP_KEY_DEV=

## Stripe 

For local test , you need to install stripe cli and do forwarding to the webhook

- Test webhook : https://dashboard.stripe.com/test/webhooks/create?endpoint_location=local
- Stripe CLI: https://stripe.com/docs/stripe-cli
