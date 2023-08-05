export const validateEnvs = (ENVS: NodeJS.ProcessEnv) => {
    const ENV = ENVS.ENV;
    const DATADOG_API_KEY = ENVS[`DATADOG_API_KEY_${ENV}`];
    const DATADOG_APP_KEY = ENVS[`DATADOG_APP_KEY_${ENV}`];

    if (!ENV) {
        throw new Error('ENV is required');
    }

    if (!ENVS.BOT_TOKEN) {
        throw new Error('BOT_TOKEN is required');
    }

    if (!ENVS.APPLICATION_NAME) {
        throw new Error('APPLICATION_NAME is required');
    }

    if (!DATADOG_API_KEY) {
        throw new Error('DATADOG_API_KEY is required');
    }

    if (!ENVS.MONGO_SRV) {
        throw new Error('MONGO_SRV is required');
    }

    if (!ENVS.MONGO_HOST) {
        throw new Error('MONGO_HOST is required');
    }

    if (!ENVS.MONGO_USER) {
        throw new Error('MONGO_USER is required');
    }

    if (!ENVS.MONGO_PASSWORD) {
        throw new Error('MONGO_PASSWORD is required');
    }

    if (!ENVS.MONGO_DB_NAME) {
        throw new Error('MONGO_DB_NAME is required');
    }

    if (!ENVS.MONGO_PORT) {
        throw new Error('MONGO_PORT is required');
    }

    if (!ENVS.BOT_APP_ID) {
        throw new Error('BOT_APP_ID is required');
    }

    if (!ENVS.BOT_SECRET) {
        throw new Error('BOT_SECRET is required');
    }
};
