import { randomUUID } from 'crypto';
import { productTiers } from '../src/data/site.js';

const allowedTiers = new Set(productTiers.map((tier) => tier.name));
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 8;
const requestsByIp = new Map();

function send(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function sanitizeText(input) {
  return String(input ?? '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeEmail(input) {
  return sanitizeText(input).toLowerCase();
}

function validateSubmission(body) {
  const name = sanitizeText(body?.name);
  const email = normalizeEmail(body?.email);
  const intendedUse = sanitizeText(body?.intendedUse);
  const preferredTier = sanitizeText(body?.preferredTier);

  const errors = [];

  if (!name || name.length < 2 || name.length > 80) {
    errors.push('name must be between 2 and 80 characters');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('email must be a valid address');
  }

  if (!intendedUse || intendedUse.length < 10 || intendedUse.length > 500) {
    errors.push('intended use must be between 10 and 500 characters');
  }

  if (!allowedTiers.has(preferredTier)) {
    errors.push('preferred product tier is not recognized');
  }

  return {
    errors,
    submission: {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      intendedUse,
      preferredTier,
    },
  };
}

function getIp(req) {
  const forwarded = String(req.headers['x-forwarded-for'] || '');
  if (forwarded) return forwarded.split(',')[0].trim();
  return String(req.headers['x-real-ip'] || req.socket?.remoteAddress || 'unknown');
}

function isRateLimited(ip) {
  const now = Date.now();
  const state = requestsByIp.get(ip);

  if (!state || state.resetAt <= now) {
    requestsByIp.set(ip, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  if (state.count >= rateLimitMax) {
    return true;
  }

  state.count += 1;
  return false;
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

  const ip = getIp(req);
  if (isRateLimited(ip)) {
    send(res, 429, {
      ok: false,
      error: 'too many requests',
      retryAfterSeconds: Math.ceil(rateLimitWindowMs / 1000),
    });
    return;
  }

  let body = req.body;

  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      send(res, 400, { ok: false, error: 'invalid JSON body' });
      return;
    }
  }

  const { errors, submission } = validateSubmission(body);

  if (errors.length > 0) {
    send(res, 400, {
      ok: false,
      error: 'submission validation failed',
      details: errors,
    });
    return;
  }

  send(res, 200, {
    ok: true,
    message: 'preorder submission accepted',
    submission,
  });
}
