import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '../products';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');

router.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { tier, billingCycle } = req.body;
    if (!tier || !Object.keys(SUBSCRIPTION_TIERS).includes(tier)) {
      return res.status(400).json({ error: 'Invalid subscription tier' });
    }
    const tierConfig = SUBSCRIPTION_TIERS[tier as SubscriptionTier];
    const price = billingCycle === 'yearly' ? tierConfig.priceYearly : tierConfig.priceMonthly;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: `${tierConfig.name} Plan` },
            unit_amount: price * 100,
            recurring: { interval: billingCycle === 'yearly' ? 'year' : 'month' },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.protocol}://${req.get('host')}/subscription?success=true`,
      cancel_url: `${req.protocol}://${req.get('host')}/pricing?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

router.get('/subscription-status', async (req: Request, res: Response) => {
  res.json({
    user: { id: 1, email: 'user@example.com', name: 'User' },
    subscription: null,
  });
});

router.get('/payment-history', async (req: Request, res: Response) => {
  res.json({ invoices: [] });
});

router.post('/cancel-subscription', async (req: Request, res: Response) => {
  res.json({ success: true, message: 'Subscription cancelled' });
});

export default router;
