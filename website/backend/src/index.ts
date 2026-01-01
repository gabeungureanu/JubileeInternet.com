import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { loadConfig, getConfig } from './config/index.js';
import { getDatabase, closeDatabase } from './db/database.js';
import { health } from './routes/health.js';
import { domains } from './routes/domains.js';
import { webhooks } from './routes/webhooks.js';

async function main(): Promise<void> {
  loadConfig();
  const config = getConfig();

  console.log('Starting Jubilee Website Backend...');

  // Initialize database connection
  getDatabase();

  const app = new Hono();

  // Middleware
  app.use('*', logger());
  app.use('*', cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }));

  // Security headers
  app.use('*', async (c, next) => {
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('X-Frame-Options', 'DENY');
    c.header('X-XSS-Protection', '1; mode=block');
    c.header('Referrer-Policy', 'strict-origin-when-cross-origin');
    await next();
  });

  // Routes
  app.route('/', health);
  app.route('/api/domains', domains);
  app.route('/webhooks', webhooks);

  // API info
  app.get('/api', (c) => {
    return c.json({
      name: 'Jubilee Internet Portal API',
      version: '0.1.0',
      description: 'SSO Portal & Domain Registry for Jubilee Internet',
      endpoints: {
        domains: '/api/domains',
        tlds: '/api/domains/tlds',
        health: '/health',
      },
      documentation: 'https://jubileeinternet.com/docs/api',
      note: 'This domain registry operates within the Jubilee Internet namespace only. Domains registered here do not exist on the public Internet/ICANN DNS.',
    });
  });

  // 404 handler
  app.notFound((c) => {
    return c.json({ error: 'not_found', error_description: 'Endpoint not found' }, 404);
  });

  // Error handler
  app.onError((err, c) => {
    console.error('Unhandled error:', err);
    return c.json({ error: 'server_error', error_description: 'Internal server error' }, 500);
  });

  const server = serve({
    fetch: app.fetch,
    port: config.PORT,
    hostname: config.HOST,
  });

  console.log(`Jubilee Website Backend running on http://${config.HOST}:${config.PORT}`);

  // Graceful shutdown
  const shutdown = async (signal: string): Promise<void> => {
    console.log(`${signal} received, shutting down...`);
    server.close();
    await closeDatabase();
    console.log('Shutdown complete');
    process.exit(0);
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

main().catch((error) => {
  console.error('Failed to start:', error);
  process.exit(1);
});
