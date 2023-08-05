import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { validateEnvs } from './validateEnvs';
import { runBot } from './bot';
import { registerSlashCommand } from './bot/registerSlashCommand';
import * as dotenv from 'dotenv';
import { LOGGER } from './logger';
import { connectDb } from './mongodb';
import { healthCheck, webhook } from "./api/services";
import { getErrorMessage } from "./util";

dotenv.config();

const ENVS = process.env;
const APP_PORT = process.env.APP_PORT || 5000;
const BOT_TOKEN = process.env.BOT_TOKEN || "";
const BOT_APP_ID = process.env.BOT_APP_ID || "";

validateEnvs(ENVS);

const app: Application = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/webhook", webhook);

app.use(express.json({ limit: "10kb" }));
app.use("/health", healthCheck);



// UnKnown Routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

try {
    app.listen(APP_PORT, (): void => {
        runAppDependencies();
        LOGGER.info(`[appStart][Connected succesfully on port: ${APP_PORT}]`, { metadata: "", sendLog: true });
    });
} catch (err) {
    LOGGER.error("[appStart][error]", { metadata: { error: getErrorMessage(err) } });
}


const runAppDependencies = async () => {
    try {
        await registerSlashCommand(BOT_TOKEN, BOT_APP_ID);
        await connectDb()
            .then(() => {
                runBot();
            })
            .catch((error) => {
                LOGGER.error(`[runApp][Error on connect db]`, {
                    metadata: { error: error, stack: error.stack.toString() },
                });
            });
    } catch (error: any) {
        LOGGER.error(`[runApp][Error on run app]`, {
            metadata: { error: error, stack: error.stack.toString() },
        });
    }
};
