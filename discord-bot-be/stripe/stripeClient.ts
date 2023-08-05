import stripe from 'stripe';
import * as dotenv from 'dotenv';
dotenv.config();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";


const stripeClient = new stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  maxNetworkRetries: 1,
  typescript: true,
  timeout: 1000,
  telemetry: true,
});

export { stripeClient };