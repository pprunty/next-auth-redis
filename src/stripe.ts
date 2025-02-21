import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

// Define a custom type alias for the supported API version.
type StripeApiVersion = '2025-01-27.acacia';

// Use an environment variable or fall back to the default,
// and assert it as our custom type.
const stripeApiVersion = (process.env.STRIPE_API_VERSION ||
  '2025-01-27.acacia') as StripeApiVersion;

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: stripeApiVersion,
});
