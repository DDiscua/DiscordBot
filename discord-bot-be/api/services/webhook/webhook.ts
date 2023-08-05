import express, { Router } from "express";
import { stripeClient } from "../../../stripe/stripeClient";
import { getErrorMessage } from "../../../util";
import { STATUS_400 } from "../../../constants";
import { LOGGER } from "../../../logger";
import * as dotenv from 'dotenv';

dotenv.config();

const webhook: Router = express.Router();
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_TEST || "";

// get /healt/status
webhook.post('/hook', express.raw({ type: 'application/json' }), (request, response) => {
    let event = request.body;
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
        // Get the signature sent by Stripe
        const signature = request.headers['stripe-signature'] || "";
        try {
            event = stripeClient.webhooks.constructEvent(
                request.body,
                signature,
                endpointSecret
            );
        } catch (err) {

            LOGGER.error(`[webhook][⚠️  Webhook signature verification failed.]`, { metadata: { error: getErrorMessage(err) } });
            return response.sendStatus(STATUS_400);
        }
    }

    // Handle the event
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
            LOGGER.info(`[webhook][PaymentIntent for ${paymentIntent.amount} was successful!]`, { metadata: {} });
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'charge.succeeded':
            const charge = event.data.object;
            console.log(`PaymentIntent for ${charge.amount} was successful!`);
            LOGGER.info(`[webhook][PaymentIntent for ${charge.amount} was successful!]`, { metadata: {} });
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            break;
        default:
            // Unexpected event type
            LOGGER.info(`[webhook][Unhandled event type ${event.type}]`, { metadata: {} });
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});


export { webhook };