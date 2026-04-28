import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { SAMPLE_CUSTOMERS } from './src/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/customers', (req, res) => {
    res.json(SAMPLE_CUSTOMERS);
  });

  app.get('/api/stats', (req, res) => {
    const total = SAMPLE_CUSTOMERS.length;
    const highRisk = SAMPLE_CUSTOMERS.filter(c => c.riskLevel === 'High').length;
    const avgChurn = (SAMPLE_CUSTOMERS.reduce((acc, c) => acc + c.churnProbability, 0) / total).toFixed(2);
    
    res.json({
      totalCustomers: total * 1000, // Scaled for demo
      atRisk: highRisk * 250,
      predictedChurnRate: `${(Number(avgChurn) * 100).toFixed(1)}%`,
      retentionLift: "+4.2%"
    });
  });

  app.post('/api/action', (req, res) => {
    const { customerId, action } = req.body;
    console.log(`Action [${action}] triggered for customer [${customerId}]`);
    res.json({ success: true, message: `Retention play '${action}' initiated.` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
