import { Router, Request, Response, raw } from 'express';
import Stripe from 'stripe';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

// Webhook endpoint for Stripe events
router.post(
  '/stripe',
  raw({ type: 'application/json' }),
  async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );

      // Handle test events
      if (event.id.startsWith('evt_test_')) {
        console.log('[Webhook] Test event detected:', event.type);
        return res.json({ verified: true });
      }

      // Handle different event types
      switch (event.type) {
        case 'checkout.session.completed':
          await handleCheckoutSessionCompleted(event.data.object as Stripe.Checkout.Session);
          break;

        case 'customer.subscription.created':
          await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.updated':
          await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
          break;

        case 'customer.subscription.deleted':
          await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
          break;

        case 'invoice.paid':
          await handleInvoicePaid(event.data.object as Stripe.Invoice);
          break;

        case 'invoice.payment_failed':
          await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({ error: 'Webhook processing failed' });
    }
  }
);

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  console.log('[Webhook] Checkout session completed:', session.id);

  const userId = session.metadata?.user_id;
  const tier = session.metadata?.subscription_tier;

  if (!userId) {
    console.error('No user_id in session metadata');
    return;
  }

  try {
    // Update user with Stripe customer and subscription info
    await db
      .update(users)
      .set({
        stripeCustomerId: session.customer as string,
        subscriptionTier: tier || 'STARTER',
        subscriptionStatus: 'active',
        updatedAt: new Date(),
      })
      .where(eq(users.id, parseInt(userId)));

    console.log(`[Webhook] User ${userId} subscription activated for tier ${tier}`);
  } catch (error) {
    console.error('Error updating user subscription:', error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('[Webhook] Subscription created:', subscription.id);

  try {
    const customerId = subscription.customer as string;

    // Find user by Stripe customer ID
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, customerId));

    if (userList.length > 0) {
      await db
        .update(users)
        .set({
          stripeSubscriptionId: subscription.id,
          subscriptionStatus: 'active',
          updatedAt: new Date(),
        })
        .where(eq(users.id, userList[0].id));

      console.log(`[Webhook] Subscription linked to user ${userList[0].id}`);
    }
  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('[Webhook] Subscription updated:', subscription.id);

  try {
    const customerId = subscription.customer as string;
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, customerId));

    if (userList.length > 0) {
      const status = subscription.status === 'active' ? 'active' : 'inactive';

      await db
        .update(users)
        .set({
          subscriptionStatus: status,
          updatedAt: new Date(),
        })
        .where(eq(users.id, userList[0].id));

      console.log(`[Webhook] User ${userList[0].id} subscription status updated to ${status}`);
    }
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('[Webhook] Subscription deleted:', subscription.id);

  try {
    const customerId = subscription.customer as string;
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, customerId));

    if (userList.length > 0) {
      await db
        .update(users)
        .set({
          subscriptionStatus: 'cancelled',
          subscriptionTier: 'FREE',
          updatedAt: new Date(),
        })
        .where(eq(users.id, userList[0].id));

      console.log(`[Webhook] User ${userList[0].id} subscription cancelled`);
    }
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  console.log('[Webhook] Invoice paid:', invoice.id);

  try {
    const customerId = invoice.customer as string;
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, customerId));

    if (userList.length > 0) {
      console.log(`[Webhook] Payment received for user ${userList[0].id}: $${(invoice.amount_paid / 100).toFixed(2)}`);
    }
  } catch (error) {
    console.error('Error handling invoice paid:', error);
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  console.log('[Webhook] Invoice payment failed:', invoice.id);

  try {
    const customerId = invoice.customer as string;
    const userList = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, customerId));

    if (userList.length > 0) {
      console.log(`[Webhook] Payment failed for user ${userList[0].id}`);
      // Could send email notification here
    }
  } catch (error) {
    console.error('Error handling invoice payment failed:', error);
  }
}

export default router;
