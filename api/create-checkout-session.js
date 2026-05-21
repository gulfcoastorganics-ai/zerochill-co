import Stripe from 'stripe';

const allowedPlans = {
  starter: {
    label: 'Starter Continuation',
    amount: 1500,
    description: 'ZeroChill Phase 2 starter continuation',
  },
  production: {
    label: 'Production Expansion',
    amount: 5000,
    description: 'ZeroChill Phase 2 production expansion',
  },
};

function send(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function getSiteUrl() {
  const fallback = 'https://zerochill-co.vercel.app';
  const configured = String(process.env.SITE_URL || '').trim();
  return configured || fallback;
}

function getStripe() {
  const secretKey = String(process.env.STRIPE_SECRET_KEY || '').trim();

  if (!secretKey) {
    return { error: 'payment infrastructure pending activation' };
  }

  if (!secretKey.startsWith('sk_test_')) {
    return { error: 'payment infrastructure pending activation' };
  }

  return {
    stripe: new Stripe(secretKey),
  };
}

function sanitizePlan(input) {
  return String(input || '').trim().toLowerCase();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    send(res, 405, {
      ok: false,
      error: 'method not allowed',
      allowedMethods: ['POST'],
    });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      send(res, 400, {
        ok: false,
        error: 'invalid JSON body',
      });
      return;
    }
  }

  const planKey = sanitizePlan(body?.tier || body?.plan || body?.package);
  const plan = allowedPlans[planKey];

  if (planKey === 'custom') {
    send(res, 400, {
      ok: false,
      error: 'custom operational rollout requires review',
      reviewRequired: true,
    });
    return;
  }

  if (!plan) {
    send(res, 400, {
      ok: false,
      error: 'selected package is not recognized',
    });
    return;
  }

  const stripeSetup = getStripe();
  if (stripeSetup.error) {
    send(res, 503, {
      ok: false,
      error: stripeSetup.error,
    });
    return;
  }

  const siteUrl = getSiteUrl();
  const origin = siteUrl.replace(/\/$/, '');

  try {
    const session = await stripeSetup.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-cancelled`,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: plan.amount,
            product_data: {
              name: plan.label,
              description: plan.description,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        tier: planKey,
        brand: 'ZeroChill Co',
      },
    });

    if (!session.url) {
      send(res, 502, {
        ok: false,
        error: 'checkout session could not be created',
      });
      return;
    }

    send(res, 200, {
      ok: true,
      url: session.url,
    });
  } catch (error) {
    console.error('ZeroChill checkout session creation failed', {
      errorType: error instanceof Error ? error.name : 'UnknownError',
    });

    send(res, 500, {
      ok: false,
      error: 'checkout session creation failed',
    });
  }
}
