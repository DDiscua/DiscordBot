import express, { Router, Request, Response } from "express";
import { getErrorMessage } from "../../../util";
import { STATUS_200, STATUS_500 } from "../../../constants";
import { LOGGER } from "../../../logger";

const healthCheck: Router = express.Router();


// get /healt/status
healthCheck.get('/status', async (req: Request, res: Response): Promise<Response> => {
    try {

        LOGGER.info(`healthcheck:`);

        return res.status(STATUS_200).send({
            status: "Up and Running",
            message: "Hell Yeah!"
        });
    } catch (error: any) {
        const errorMessage = getErrorMessage(error.toString());
        LOGGER.error(`healthcheck: ${errorMessage}`);

        return res.status(STATUS_500).send({
            status: "Up and Running",
            message: errorMessage
        });
    }
});


export { healthCheck };