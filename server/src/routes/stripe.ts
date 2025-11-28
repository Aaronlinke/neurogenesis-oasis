import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { SUBSCRIPTION_TIERS, SubscriptionTier } from '../products';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Create checkout session for subscription
router.post('/create-checkout-session', async (req: Request, res: Response) => {
  try {
    const { tier, billingCycle } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!tier || !Object.keys(SUBSCRIPTION_TIERS).includes(tier)) {
      return res.status(400).json({ error: 'Invalid subscription tier' });
    }

    const tierConfig = SUBSCRIPTION_TIERS[tier as SubscriptionTier];
    const price = billingCycle === 'yearly' ? tierConfig.priceYearly : tierConfig.priceMonthly;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      customer_email: user.email,
      client_reference_id: user.id.toString(),
      metadata: {
        user_id: user.id.toString(),
        customer_email: user.email,
        customer_name: user.name || 'User',
        subscription_tier: tier,
        billing_cycle: billingCycle,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${tierConfig.name} Plan`,
              description: tierConfig.description,
              metadata: {
                tier,
              },
            },
            unit_amount: Math.round(price * 100), // Convert to cents
            recurring: {
              interval: billingCycle === 'yearly' ? 'year' : 'month',
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing`,
      allow_promotion_codes: true,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Get subscription status
router.get('/subscription-status', async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Fetch user with subscription info
    const userWithSub = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (!userWithSub.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userWithSub[0];
    let subscriptionData = null;

    if (userData.stripeSubscriptionId) {
      subscriptionData = await stripe.subscriptions.retrieve(userData.stripeSubscriptionId);
    }

    res.json({
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
      },
      subscription: subscriptionData ? {
        id: subscriptionData.id,
        status: subscriptionData.status,
        currentPeriodStart: new Date(subscriptionData.current_period_start * 1000),
        currentPeriodEnd: new Date(subscriptionData.current_period_end * 1000),
        cancelAtPeriodEnd: subscriptionData.cancel_at_period_end,
      } : null,
    });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

// Cancel subscription
router.post('/cancel-subscription', async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userWithSub = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (!userWithSub.length || !userWithSub[0].stripeSubscriptionId) {
      return res.status(404).json({ error: 'No active subscription' });
    }

    const subscription = await stripe.subscriptions.update(
      userWithSub[0].stripeSubscriptionId,
      { cancel_at_period_end: true }
    );

    res.json({
      message: 'Subscription cancelled',
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

// Get payment history
router.get('/payment-history', async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userWithSub = await db
      .select()
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (!userWithSub.length) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userWithSub[0];
    const invoices = await stripe.invoices.list({
      customer: userData.stripeCustomerId || undefined,
      limit: 50,
    });

    const formattedInvoices = invoices.data.map(invoice => ({
      id: invoice.id,
      date: new Date(invoice.created * 1000),
      amount: invoice.amount_paid / 100,
      currency: invoice.currency.toUpperCase(),
      status: invoice.status,
      pdfUrl: invoice.pdf,
      description: invoice.description,
    }));

    res.json({
      invoices: formattedInvoices,
      total: invoices.data.length,
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ error: 'Failed to fetch payment history' });
  }
});

export default router;
