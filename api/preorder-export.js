function send(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

function getToken(req) {
  try {
    const url = new URL(req.url, 'http://localhost');
    return url.searchParams.get('token') || '';
  } catch {
    return '';
  }
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    send(res, 405, {
      ok: false,
      error: 'method not allowed',
      allowedMethods: ['GET'],
    });
    return;
  }

  const expectedToken = process.env.ADMIN_EXPORT_TOKEN || '';
  const token = getToken(req);

  if (!expectedToken) {
    send(res, 500, {
      ok: false,
      error: 'export token is not configured',
    });
    return;
  }

  if (!token) {
    send(res, 401, {
      ok: false,
      error: 'missing export token',
    });
    return;
  }

  if (token !== expectedToken) {
    send(res, 403, {
      ok: false,
      error: 'invalid export token',
    });
    return;
  }

  send(res, 200, {
    ok: true,
    export: {
      format: 'json',
      persisted: false,
      note: 'serverless memory is not persistent; this endpoint returns a placeholder export format until durable storage is added',
      generatedAt: new Date().toISOString(),
      records: [],
    },
  });
}
